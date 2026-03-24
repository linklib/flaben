"use client";

import * as React from "react";
import { useMemo } from "react";
import clsx from "clsx";
import css from "./common-floors-data.module.scss";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";
import { RoomType } from "@/types/room.type";
import { TableDataType } from "@/types/table-data.type";
import PlannerTable from "@/app/(site)/planner/сomponents/app-planner/components/planner-table/planner-table";
import CustomTable from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/custom-table/custom-table";
import { getFlowRatio } from "@/utils/features/get-flow-ratio";
import { FloorType } from "@/types/floor.type";
import { getRoomVolume } from "@/utils/features/get-room-volume";
import { getConsumptionVolumeByType } from "@/utils/features/get-consumption-volume-by-type";
import { AirTypeEnum } from "@/utils/enums/air-type.enum";
import AppTextInput from "@/app/components/app-text-input/app-text-input";
import { setRoomParamsFromState } from "@/utils/features/set-room-params-from-state";
import { getAirConsumption } from "@/utils/features/get-air-consumption";
import { getDuctsNumber } from "@/utils/features/get-ducts-number";

export default function CommonFloorsData() {
  const [state, setState] = useRecoilState(plannerState);
  const rooms = state.floors.flatMap((floor, index) =>
    floor.rooms.map((room) => {
      return {
        ...room,
        floor: index + 1,
      };
    }),
  );

  const tableData: TableDataType = {
    headers: [
      { name: "№", getter: (room: RoomType) => room.number },
      { name: "Этаж", getter: (room: RoomType) => room.floor },
      {
        name: "Помещение",
        getter: (room: RoomType) => (
          <div className={css.limited}>{room.name}</div>
        ),
      },
      {
        name: (
          <span>
            площадь, м<sup>2</sup>
          </span>
        ),
        getter: (room: RoomType) => (room.length * room.width).toFixed(1),
      },
      {
        name: (
          <span>
            объём, м<sup>3</sup>
          </span>
        ),
        getter: (room: RoomType) =>
          getRoomVolume(
            room,
            state.floors.find(
              (floor) => floor.number === room.floor,
            ) as FloorType,
          ).toFixed(1),
      },
      {
        name: "Кратность воздухообмена, V/ч",
        getter: (room: RoomType) => {
          const flowRatio = getFlowRatio(
            room,
            state.floors.find(
              (floor) => floor.number === room.floor,
            ) as FloorType,
            state.consumptionRate,
          );
          if (flowRatio < 1) return 1;
          return flowRatio.toFixed(1);
        },
      },
      {
        name: "Воздух",
        getter: (room: RoomType) => (
          <div className={css.limited}>{room.airType}</div>
        ),
      },
      {
        name: (
          <span>
            расход воздуха, м<sup>3</sup>
          </span>
        ),
        getter: (room: RoomType) => {
          const floor = state.floors.find(
            (floor) => floor.number === room.floor,
          ) as FloorType;

          return (
            <AppTextInput
              textfieldProps={{
                value: Math.round(
                  getAirConsumption(room, floor, state.consumptionRate),
                ),
                type: "number",
                inputProps: { min: 1, step: 1 },
                onChange: (event) =>
                  setState(
                    setRoomParamsFromState(state, {
                      ...room,
                      airConsumption: Number(event.target.value),
                    }),
                  ),
              }}
            />
          );
        },
      },
      {
        name: "кол-во воздуховодов",
        getter: (room: RoomType) =>
          getDuctsNumber(
            room,
            state.floors.find(
              (floor) => floor.number === room.floor,
            ) as FloorType,
            room.airConsumption ??
              getAirConsumption(
                room,
                state.floors.find(
                  (floor) => floor.number === room.floor,
                ) as FloorType,
                state.consumptionRate,
              ),
          ),
      },
    ],
    rows: rooms,
  };

  const totalExhaustConsumption = useMemo(
    () => getConsumptionVolumeByType(state.floors, AirTypeEnum.Exhaust),
    [state.floors],
  );

  const totalSupplyConsumption = useMemo(
    () => getConsumptionVolumeByType(state.floors, AirTypeEnum.Supply),
    [state.floors],
  );

  return (
    <div className={clsx(css.container)}>
      <div className={css.table}>
        <PlannerTable id={"rooms-common-data"} data={tableData} />
        <div className={css.footer}>
          <div className={css.caption}>
            Допустимая разница между общим объёмом приточного и вытяжного
            воздуха, не должна превышать 10%. Вам необходимо учесть данный
            показатель при заполнении параметров.
          </div>
          <CustomTable
            data={[
              {
                key: (
                  <span>
                    Общий расход приточного воздуха, м<sup>3</sup>
                  </span>
                ),
                value: totalSupplyConsumption,
              },
              {
                key: (
                  <span>
                    Общий расход вытяжного воздуха, м<sup>3</sup>
                  </span>
                ),
                value: totalExhaustConsumption,
                error:
                  totalSupplyConsumption / totalExhaustConsumption < 0.9 ||
                  totalSupplyConsumption / totalExhaustConsumption > 1.1,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
