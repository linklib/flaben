import { atom } from "recoil";
import { SilencerTypeEnum } from "@/utils/enums/silencer-type.enum";
import { AirIntakePlacementTypeEnum } from "@/utils/enums/air-intake-placement-type.enum";
import { VentilationSystemTypeEnum } from "@/utils/enums/ventilation-system-type.enum";
import { AirConsumptionRateEnum } from "@/utils/enums/air-consumption-rate.enum";
import { AirConsumptionRateMap } from "@/utils/maps/air-consumption-rate.map";
import { PlannerStateType } from "@/types/planner-state.type";
import { baseRoom } from "@/utils/constants/constants";

export const plannerState = atom({
  key: "plannerState",
  default: {
    installationFloor: 1,
    silencerType: SilencerTypeEnum.Standard,
    airIntakePlacement: AirIntakePlacementTypeEnum.Roof,
    lengthFromVentilationUnitToIntakeManifold: 2,
    lengthFromVentilationUnitToExhaustManifold: 2,
    lengthFromVentilationUnitToIntakePoint: 2,
    numberOf90degreesTurns: 2,
    systemType: VentilationSystemTypeEnum.Classic,
    consumptionRate: AirConsumptionRateMap.get(AirConsumptionRateEnum.Standard),
    floors: [
      {
        number: 1,
        height: 2.8,
        rooms: [{ ...baseRoom, floor: 1 }],
      },
    ],
  } as PlannerStateType,
});
