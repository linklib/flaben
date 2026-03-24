import { plannerValues } from "@/utils/constants/constants";
import { PlannerStateType } from "@/types/planner-state.type";
import { VentilationSystemTypeEnum } from "@/utils/enums/ventilation-system-type.enum";
import { AirTypeEnum } from "@/utils/enums/air-type.enum";
import { getDuctsNumber } from "@/utils/features/get-ducts-number";
import { getAirConsumption } from "@/utils/features/get-air-consumption";
import { AirIntakePlacementTypeEnum } from "@/utils/enums/air-intake-placement-type.enum";
import { SilencerTypeEnum } from "@/utils/enums/silencer-type.enum";

type PlannerProducts = { id: number; amount: number; name?: string };

enum SystemTypeEnum {
  Classic = "Классическая",
  Slim = "Тонкая",
}

type CollectorParams = {
  count: number;
  holes: number;
} | null;

type CollectorBySystemTypeWithParams = Map<SystemTypeEnum, CollectorParams>;

function getClassicCollectorSize(airDuctsNumber: number) {
  if (airDuctsNumber <= 8) return 8;
  else if (airDuctsNumber <= 16) return 16;
  else return 24;
}

function getSlimCollectorSize(airDuctsNumber: number) {
  if (airDuctsNumber <= 6) return 6;
  else if (airDuctsNumber <= 10) return 10;
  else return 12;
}

function getTotalPipeCountFromStateByType(
  state: PlannerStateType,
  type: AirTypeEnum,
) {
  return state.floors
    .flatMap((floor) => [
      ...floor.rooms.flatMap((room) =>
        room.airType === type
          ? getDuctsNumber(
              room,
              floor,
              room.airConsumption ??
                getAirConsumption(room, floor, state.consumptionRate),
            )
          : 0,
      ),
    ])
    .reduce((previousValue, currentValue) => previousValue + currentValue);
}

function getConnectorsNumberFromState(
  state: PlannerStateType,
  productLinesMap: Map<AirTypeEnum, SystemTypeEnum>,
) {
  const roomsConnectorsNumber = state.floors.flatMap((floor) => [
    ...floor.rooms.flatMap((room) => {
      const ductsNumber = getDuctsNumber(room, floor, state.consumptionRate);
      const roomProductLine = productLinesMap.get(
        room.airType,
      ) as SystemTypeEnum;

      return {
        classicConnectorCount:
          roomProductLine === SystemTypeEnum.Classic
            ? Math.ceil(ductsNumber / 2)
            : 0,
        slim1ConnectorCount:
          roomProductLine !== SystemTypeEnum.Classic && ductsNumber <= 1
            ? ductsNumber
            : 0,
        slim3ConnectorCount:
          roomProductLine !== SystemTypeEnum.Classic && ductsNumber > 1
            ? Math.ceil(ductsNumber / 3)
            : 0,
        connectorVolumeRegulationValveCount:
          roomProductLine !== SystemTypeEnum.Classic && ductsNumber > 1
            ? ductsNumber
            : 0,
      };
    }),
  ]);

  return roomsConnectorsNumber
    .map((values, index, array) => {
      if (index === 0) return values;

      return {
        classicConnectorCount:
          values.classicConnectorCount + array[index - 1].classicConnectorCount,
        slim1ConnectorCount:
          values.slim1ConnectorCount + array[index - 1].slim1ConnectorCount,
        slim3ConnectorCount:
          values.slim3ConnectorCount + array[index - 1].slim3ConnectorCount,
        connectorVolumeRegulationValveCount:
          values.connectorVolumeRegulationValveCount +
          array[index - 1].connectorVolumeRegulationValveCount,
      };
    })
    .pop() as {
    classicConnectorCount: number;
    slim1ConnectorCount: number;
    slim3ConnectorCount: number;
    connectorVolumeRegulationValveCount: number;
  };
}

function getConnectorPlugsForSystemType(
  systemType: SystemTypeEnum,
  collectorsParamsBySystemType: CollectorBySystemTypeWithParams,
  productLinesMap: Map<AirTypeEnum, SystemTypeEnum>,
  airDuctPipeNumberByAirTypeMap: Map<AirTypeEnum, number>,
) {
  return Array.from(
    (Object.keys(AirTypeEnum) as Array<keyof typeof AirTypeEnum>).map(
      (airType) => {
        const collector = collectorsParamsBySystemType.get(
          productLinesMap.get(AirTypeEnum[airType]) as SystemTypeEnum,
        ) as CollectorParams;
        const productLine = productLinesMap.get(
          AirTypeEnum[airType],
        ) as SystemTypeEnum;

        if (
          systemType === productLine &&
          collector !== null &&
          productLine !== SystemTypeEnum.Slim
        ) {
          const airTypeDuctNumber = airDuctPipeNumberByAirTypeMap.get(
            AirTypeEnum[airType],
          ) as number;

          return collector.holes - airTypeDuctNumber;
        }
        return 0;
      },
    ),
  ).reduce((previousValue, currentValue) => previousValue + currentValue);
}

// const getDistanceFrom

export const getProductsFromPlannerState = (state: PlannerStateType) => {
  const plannerConsts = plannerValues;

  const productLinesMap: Map<AirTypeEnum, SystemTypeEnum> = new Map([
    [AirTypeEnum.Exhaust, SystemTypeEnum.Classic],
    [
      AirTypeEnum.Supply,
      state.systemType !== VentilationSystemTypeEnum.Combined
        ? SystemTypeEnum.Classic
        : SystemTypeEnum.Slim,
    ],
  ]);

  const airDuctPipeNumberMapByAirType: Map<AirTypeEnum, number> = new Map([
    [
      AirTypeEnum.Exhaust,
      getTotalPipeCountFromStateByType(state, AirTypeEnum.Exhaust),
    ],
    [
      AirTypeEnum.Supply,
      getTotalPipeCountFromStateByType(state, AirTypeEnum.Supply),
    ],
  ]);

  const airDuctPipeNumberBySystemTypeMap = new Map([
    [
      SystemTypeEnum.Classic,
      (productLinesMap.get(AirTypeEnum.Supply) === SystemTypeEnum.Classic
        ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Supply) as number)
        : 0) +
        (productLinesMap.get(AirTypeEnum.Exhaust) === SystemTypeEnum.Classic
          ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Exhaust) as number)
          : 0),
    ],
    [
      SystemTypeEnum.Slim,
      (productLinesMap.get(AirTypeEnum.Supply) === SystemTypeEnum.Slim
        ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Supply) as number)
        : 0) +
        (productLinesMap.get(AirTypeEnum.Exhaust) === SystemTypeEnum.Slim
          ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Exhaust) as number)
          : 0),
    ],
  ]);

  const airDuctLengthBySystemTypeMap = new Map([
    [
      SystemTypeEnum.Classic,
      (airDuctPipeNumberBySystemTypeMap.get(SystemTypeEnum.Classic) as number) *
        plannerConsts.airDuctPipeLength,
    ],
    [
      SystemTypeEnum.Slim,
      (airDuctPipeNumberBySystemTypeMap.get(SystemTypeEnum.Slim) as number) *
        plannerConsts.airDuctPipeLength,
    ],
  ]);

  // const collectorsAmountBySystemType = new Map().set(
  //   productLinesMap.get(AirTypeEnum.Supply),
  //   airDuctPipeNumberBySystemTypeMap.get(
  //     productLinesMap.get(AirTypeEnum.Supply) as SystemLineTypeEnum,
  //   ),
  // );

  const collectorsNumberBySystemType = new Map([
    [
      SystemTypeEnum.Classic,
      (productLinesMap.get(AirTypeEnum.Supply) === SystemTypeEnum.Classic &&
      (airDuctPipeNumberBySystemTypeMap.get(
        productLinesMap.get(AirTypeEnum.Supply) as SystemTypeEnum,
      ) as number) > 0
        ? 1
        : 0) +
        (productLinesMap.get(AirTypeEnum.Exhaust) === SystemTypeEnum.Classic &&
        (airDuctPipeNumberBySystemTypeMap.get(
          productLinesMap.get(AirTypeEnum.Exhaust) as SystemTypeEnum,
        ) as number) > 0
          ? 1
          : 0),
    ],
    [
      SystemTypeEnum.Slim,
      (productLinesMap.get(AirTypeEnum.Supply) === SystemTypeEnum.Slim &&
      (airDuctPipeNumberBySystemTypeMap.get(
        productLinesMap.get(AirTypeEnum.Supply) as SystemTypeEnum,
      ) as number) > 0
        ? 1
        : 0) +
        (productLinesMap.get(AirTypeEnum.Exhaust) === SystemTypeEnum.Slim &&
        (airDuctPipeNumberBySystemTypeMap.get(
          productLinesMap.get(AirTypeEnum.Exhaust) as SystemTypeEnum,
        ) as number) > 0
          ? 1
          : 0),
    ],
  ]);

  const collectorsParamsBySystemType: CollectorBySystemTypeWithParams = new Map(
    [
      [
        SystemTypeEnum.Classic,
        collectorsNumberBySystemType.get(SystemTypeEnum.Classic) === 0
          ? null
          : {
              count: collectorsNumberBySystemType.get(
                SystemTypeEnum.Classic,
              ) as number,
              holes: getClassicCollectorSize(
                state.systemType === VentilationSystemTypeEnum.Classic
                  ? Math.max(
                      airDuctPipeNumberMapByAirType.get(
                        AirTypeEnum.Exhaust,
                      ) as number,
                      airDuctPipeNumberMapByAirType.get(
                        AirTypeEnum.Supply,
                      ) as number,
                    )
                  : (airDuctPipeNumberBySystemTypeMap.get(
                      SystemTypeEnum.Classic,
                    ) as number),
              ),
            },
      ],
      [
        SystemTypeEnum.Slim,
        state.systemType === VentilationSystemTypeEnum.Classic ||
        collectorsNumberBySystemType.get(SystemTypeEnum.Classic) === 0
          ? null
          : {
              count: collectorsNumberBySystemType.get(
                SystemTypeEnum.Slim,
              ) as number,
              holes: getSlimCollectorSize(
                airDuctPipeNumberBySystemTypeMap.get(
                  SystemTypeEnum.Slim,
                ) as number,
              ),
            },
      ],
    ],
  );

  const isoPipeDiameter =
    collectorsParamsBySystemType.get(SystemTypeEnum.Classic)?.holes === 24
      ? 200
      : 160;

  const distanceToExhaustCollector = Math.ceil(
    state.lengthFromVentilationUnitToExhaustManifold,
  );

  const distanceToSupplyCollector = Math.ceil(
    state.lengthFromVentilationUnitToIntakeManifold,
  );

  const isoPipeLength = Math.ceil(
    distanceToExhaustCollector +
      distanceToSupplyCollector +
      (state.airIntakePlacement === AirIntakePlacementTypeEnum.Roof
        ? state.floors
            .flatMap((floor) =>
              floor.number >= state.installationFloor
                ? Math.ceil(floor.height) + plannerConsts.distanceBetweenStages
                : 0,
            )
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
            )
        : Math.ceil(state.lengthFromVentilationUnitToIntakePoint) * 2),
  );

  const airDuctProductLengthBySystemType = new Map([
    [SystemTypeEnum.Classic, 50],
    [SystemTypeEnum.Slim, 2],
  ]);

  // total product-params
  // const airDuctNumberBySystemType = new Map([
  //   [
  //     SystemTypeEnum.Classic,
  //     (productLinesMap.get(AirTypeEnum.Supply) === SystemTypeEnum.Classic
  //       ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Supply) as number)
  //       : 0) +
  //       (productLinesMap.get(AirTypeEnum.Exhaust) === SystemTypeEnum.Classic
  //         ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Exhaust) as number)
  //         : 0),
  //   ],
  //   [
  //     SystemTypeEnum.Slim,
  //     (productLinesMap.get(AirTypeEnum.Supply) === SystemTypeEnum.Slim
  //       ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Supply) as number)
  //       : 0) +
  //       (productLinesMap.get(AirTypeEnum.Exhaust) === SystemTypeEnum.Slim
  //         ? (airDuctPipeNumberMapByAirType.get(AirTypeEnum.Exhaust) as number)
  //         : 0),
  //   ],
  // ]);

  const mountingClipNumberBySystemType = new Map([
    [
      SystemTypeEnum.Classic,
      Math.ceil(
        Math.ceil(
          airDuctLengthBySystemTypeMap.get(SystemTypeEnum.Classic) as number,
        ) / 10,
      ),
    ],
    [
      SystemTypeEnum.Slim,
      Math.ceil(
        airDuctLengthBySystemTypeMap.get(SystemTypeEnum.Slim) as number,
      ),
    ],
  ]);

  const sealRingNumber = Math.ceil(
    ((airDuctPipeNumberBySystemTypeMap.get(SystemTypeEnum.Classic) as number) *
      2) /
      10,
  );

  const {
    classicConnectorCount,
    slim1ConnectorCount,
    slim3ConnectorCount,
    connectorVolumeRegulationValveCount,
  } = getConnectorsNumberFromState(state, productLinesMap);

  const airDuctPlugNumberBySystemType = new Map([
    [
      SystemTypeEnum.Classic,
      (airDuctPipeNumberBySystemTypeMap.get(SystemTypeEnum.Classic) as number) *
        2,
    ],
    [
      SystemTypeEnum.Slim,
      (airDuctPipeNumberBySystemTypeMap.get(SystemTypeEnum.Slim) as number) * 2,
    ],
  ]);

  const ventKnife =
    (airDuctPipeNumberBySystemTypeMap.get(SystemTypeEnum.Classic) as number) > 0
      ? 1
      : 0;

  const collector = collectorsParamsBySystemType;

  const collectorPlugsMap = new Map([
    [
      SystemTypeEnum.Classic,
      getConnectorPlugsForSystemType(
        SystemTypeEnum.Classic,
        collectorsParamsBySystemType,
        productLinesMap,
        airDuctPipeNumberMapByAirType,
      ),
    ],
    [
      SystemTypeEnum.Slim,
      getConnectorPlugsForSystemType(
        SystemTypeEnum.Slim,
        collectorsParamsBySystemType,
        productLinesMap,
        airDuctPipeNumberMapByAirType,
      ),
    ],
  ]);

  const diffuser = classicConnectorCount;

  const silencer = { count: 2, diameter: isoPipeDiameter };

  const isoPipe = { count: isoPipeLength, diameter: isoPipeDiameter };

  const isoPipeCoupling = {
    count: Math.ceil(state.numberOf90degreesTurns),
    diameter: isoPipeDiameter,
  };

  const isoPipeClamp = { count: isoPipeLength, diameter: isoPipeDiameter };

  const electricValve = { count: 2, diameter: isoPipeDiameter };

  const ventHood = {
    count: state.airIntakePlacement === AirIntakePlacementTypeEnum.Wall ? 2 : 0,
    diameter: isoPipeDiameter,
  };

  const panel1 = slim1ConnectorCount;
  const panel3 = slim3ConnectorCount;

  const outlet = {
    count: Math.ceil(state.numberOf90degreesTurns),
    diameter: isoPipeDiameter,
  };

  const plannerProducts: PlannerProducts[] = [
    {
      id: 15,
      amount: mountingClipNumberBySystemType.get(
        SystemTypeEnum.Classic,
      ) as number,
      name: "Фиксатор для гибкого воздуховода DN 75, (1 комплект = 10 шт.) ",
    },
    {
      id: 7,
      amount: classicConnectorCount,
      name: "Адаптер диффузора D125 c подключением двух воздуховодов DN 75, L 235мм ",
    },
    {
      id: 11,
      amount: sealRingNumber,
      name: "Кольцо уплотнительное DN 75, (1 комплект = 10 шт.) ",
    },
    {
      id: 5,
      amount: Math.ceil(
        (airDuctLengthBySystemTypeMap.get(SystemTypeEnum.Classic) as number) /
          (airDuctProductLengthBySystemType.get(
            SystemTypeEnum.Classic,
          ) as number),
      ),
      name: "Воздуховод гибкий DN 75/63 антибактериальный/антистатический 50м",
    },
    {
      id: 16,
      amount: airDuctPlugNumberBySystemType.get(
        SystemTypeEnum.Classic,
      ) as number,
      name: "Заглушка для гибкого воздуховода DN 75 ",
    },
    {
      id: 18,
      amount:
        collector.get(SystemTypeEnum.Classic)?.holes === 8
          ? collector.get(SystemTypeEnum.Classic)?.count ?? 0
          : 0,
      name: "Распределительный коллектор шумоизолированный DN 160, на 8 выходов DN 75. ",
    },
    {
      id: 19,
      amount:
        collector.get(SystemTypeEnum.Classic)?.holes === 16
          ? collector.get(SystemTypeEnum.Classic)?.count ?? 0
          : 0,
      name: "Распределительный коллектор шумоизолированный DN 160, на 16 выходов DN 75. ",
    },
    {
      id: 18,
      amount:
        collector.get(SystemTypeEnum.Classic)?.holes === 24
          ? collector.get(SystemTypeEnum.Classic)?.count ?? 0
          : 0,
      name: "Распределительный коллектор шумоизолированный DN 200, на 24 выходов DN 75 ",
    },
    {
      id: 22,
      amount: collectorPlugsMap.get(SystemTypeEnum.Classic) as number,
      name: "Заглушка для коллектора DN 75 ",
    },
    {
      id: 25,
      amount: ventKnife,
      name: "Нож для гибкого воздуховода DN 75 ",
    },
    {
      id: 26,
      amount: Math.ceil(
        (airDuctLengthBySystemTypeMap.get(SystemTypeEnum.Slim) as number) /
          (airDuctProductLengthBySystemType.get(SystemTypeEnum.Slim) as number),
      ),
      name: "Воздуховод плоский 132/30 антибактериальный/антистатический 2м ",
    },
    {
      id: 27,
      amount:
        collector.get(SystemTypeEnum.Slim)?.holes === 12
          ? collector.get(SystemTypeEnum.Slim)?.count ?? 0
          : 0,
      name: "Распределительная коробка DN 160, на 12 выходов 132/30. Распределительная коробка DN 160, на 12 выходов 132/30. В комплекте коннекторы для подключения воздуховодов с регуляторами потока (12 шт.) ",
    },
    {
      id: 1,
      amount:
        collector.get(SystemTypeEnum.Slim)?.holes === 10
          ? collector.get(SystemTypeEnum.Slim)?.count ?? 0
          : 0,
      name: "Распределительная коробка DN 160, на 10 выходов 132/30. ",
    },
    {
      id: 29,
      amount:
        collector.get(SystemTypeEnum.Slim)?.holes === 6
          ? collector.get(SystemTypeEnum.Slim)?.count ?? 0
          : 0,
      name: "Распределительная коробка DN 160, на 6 выходов 132/30. ",
    },
    {
      id: 30,
      amount: slim3ConnectorCount,
      name: "Адаптер внутрипольный 700/80/120 на три входа 132/32 ",
    },
    {
      id: 13,
      amount: panel3,
      name: "Панель из нержавеющей стали 700/80 с одним щелевым отверстием, цвет серебро",
    },
    {
      id: 32,
      amount: slim1ConnectorCount,
      name: "Адаптер внутрипольный 370/72/90 на один вход 132/32 ",
    },
    {
      id: 33,
      amount: panel1,
      name: "Панель из нержавеющей стали 400/90 с одним щелевым отверстием, цвет серебро ",
    },
    {
      id: 37,
      amount: mountingClipNumberBySystemType.get(SystemTypeEnum.Slim) as number,
      name: "Фиксатор из нержавеющей стали для плоского воздуховода 132/30 ",
    },
    {
      id: 45,
      amount: 0,
      name: "Коннектор для подключения воздуховода к внутрипольному адаптеру с регулятором потока воздуха 132/32 ",
    },
    {
      id: 1,
      amount: airDuctPlugNumberBySystemType.get(SystemTypeEnum.Slim) as number,
      name: "Заглушка для плоского воздуховода 132/32 ",
    },
    {
      id: 47,
      amount: collectorPlugsMap.get(SystemTypeEnum.Slim) as number,
      name: "Заглушка для распределительной коробки 132/32 ",
    },
    {
      id: 1,
      amount: isoPipeDiameter === 160 ? isoPipe.count : 0,
      name: "Thermo Duct воздуховод DN 160 с фланцем, L 1000 мм ",
    },
    {
      id: 50,
      amount: isoPipeDiameter === 200 ? isoPipe.count : 0,
      name: "Thermo Duct воздуховод DN 200 с фланцем, L 1000 мм ",
    },
    {
      id: 52,
      amount: outlet.diameter === 160 ? outlet.count : 0,
      name: "Thermo Duct отвод 90° DN 160, FLIBEN. (Можно разделить на 2х45°) ",
    },
    {
      id: 53,
      amount: outlet.diameter === 200 ? outlet.count : 0,
      name: "Thermo Duct отвод 90° DN 200, FLIBEN. (Можно разделить на 2х45°) ",
    },
    {
      id: 55,
      amount: isoPipeCoupling.diameter === 160 ? isoPipeCoupling.count : 0,
      name: "Муфта соединительная для Thermo Duct воздуховода DN 160 ",
    },
    {
      id: 56,
      amount: isoPipeCoupling.diameter === 200 ? isoPipeCoupling.count : 0,
      name: "Муфта соединительная для Thermo Duct воздуховода DN 200 ",
    },
    {
      id: 60,
      amount:
        silencer.diameter === 160 &&
        state.silencerType === SilencerTypeEnum.Standard
          ? silencer.count
          : 0,
      name: "Шумоглушитель Thermo Duct DN 160, L600 ",
    },
    {
      id: 61,
      amount:
        silencer.diameter === 200 &&
        state.silencerType === SilencerTypeEnum.Standard
          ? silencer.count
          : 0,
      name: "Шумоглушитель Thermo Duct DN 200, L600 ",
    },
    {
      id: 66,
      amount:
        silencer.diameter === 160 &&
        state.silencerType === SilencerTypeEnum.Flex
          ? silencer.count
          : 0,
      name: "Гибкий шумоглушитель Thermo Duct DN 160, L1000 ",
    },
    {
      id: 67,
      amount:
        silencer.diameter === 200 &&
        state.silencerType === SilencerTypeEnum.Flex
          ? silencer.count
          : 0,
      name: "Гибкий шумоглушитель Thermo Duct DN 200, L1000 ",
    },
    {
      id: 69,
      amount: electricValve.diameter === 160 ? electricValve.count : 0,
      name: "Thermo Duct клапан противопожарный DN 160 ",
    },
    {
      id: 70,
      amount: electricValve.diameter === 200 ? electricValve.count : 0,
      name: "Thermo Duct клапан противопожарный DN 200 ",
    },
    {
      id: 72,
      amount: isoPipeClamp.diameter === 160 ? isoPipeClamp.count : 0,
      name: "Хомут монтажный для Thermo Duct воздуховода DN 160 ",
    },
    {
      id: 73,
      amount: isoPipeClamp.diameter === 200 ? isoPipeClamp.count : 0,
      name: "Хомут монтажный для Thermo Duct воздуховода DN 200 ",
    },
    {
      id: 39,
      amount: 0,
      name: "Отвод горизонтальный 90° для плоского воздуховода 132/32 ",
    },
    {
      id: 38,
      amount: 0,
      name: "Отвод горизонтальный 45° для плоского воздуховода 132/32 ",
    },
    {
      id: 40,
      amount: 0,
      name: "Отвод вертикальный 90° для плоского воздуховода 132/32 ",
    },
    {
      id: 41,
      amount: 0,
      name: "Отвод вертикальный 45° для плоского воздуховода 132/32 ",
    },
    {
      id: 1,
      amount: airDuctPipeNumberBySystemTypeMap.get(
        SystemTypeEnum.Slim,
      ) as number,
      name: "Муфта соединительная для плоского воздуховода 132/32 ",
    },
    {
      id: 44,
      amount: slim3ConnectorCount * 2,
      name: "Коннектор для внутрипольного адаптера 700/80/120 ",
    },
    {
      id: 74,
      amount: isoPipe.diameter === 160 ? 1 : 0,
      name: "Фильтр-бокс Thermo Duct DN 160 ",
    },
    {
      id: 75,
      amount: isoPipe.diameter === 200 ? 1 : 0,
      name: "Фильтр-бокс Thermo Duct DN 200 ",
    },
  ].filter((plannerProduct) => plannerProduct.amount !== 0);

  return plannerProducts;
};
