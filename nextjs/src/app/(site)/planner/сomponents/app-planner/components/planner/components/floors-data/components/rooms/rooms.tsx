"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./rooms.module.scss";
import AppButton from "@/app/components/app-button/app-button";
import PlusIcon from "@/app/components/icons/plus.icon";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";
import { RoomType } from "@/types/room.type";
import GarbageIcon from "@/app/components/icons/garbage.icon";
import { TableDataType } from "@/types/table-data.type";
import { baseRoom } from "@/utils/constants/constants";
import PlannerTable from "@/app/(site)/planner/сomponents/app-planner/components/planner-table/planner-table";
import { FloorType } from "@/types/floor.type";
import AppSelectInput from "@/app/components/app-select-input/app-select-input";
import { AirTypeEnum } from "@/utils/enums/air-type.enum";
import AppTextInput from "@/app/components/app-text-input/app-text-input";
import { setRoomParamsFromState } from "@/utils/features/set-room-params-from-state";

type Props = {
  activeFloor: number;
};

export default function Rooms(props: Readonly<Props>) {
  const [state, setState] = useRecoilState(plannerState);
  const { rooms } = state.floors.find(
    (floor) => floor.number === props.activeFloor,
  ) as FloorType;

  const roomDeleteButton = (room: RoomType, rowIndex: number | undefined) => (
    <AppButton
      buttonProps={{ disabled: rowIndex === 0 }}
      red
      trailingComponent={<GarbageIcon />}
      onClickCallback={() =>
        setState({
          ...state,
          floors: state.floors.map((floor, index) => {
            if (props.activeFloor === floor.number) {
              return {
                ...floor,
                rooms: floor.rooms.filter(
                  (floorRoom) => floorRoom.number !== room.number,
                ),
              };
            }
            return floor;
          }),
        })
      }
    />
  );

  const tableData: TableDataType = {
    headers: [
      { name: "№", getter: (room: RoomType) => room.number },
      {
        name: "Помещение",
        getter: (room: RoomType) => (
          <AppTextInput
            textfieldProps={{
              value: room.name,
              onChange: (event) =>
                setState(
                  setRoomParamsFromState(state, {
                    ...room,
                    name: event.target.value,
                  }),
                ),
            }}
          />
        ),
      },
      {
        name: "Воздух",
        getter: (room: RoomType) => (
          <AppSelectInput
            items={(
              Object.keys(AirTypeEnum) as Array<keyof typeof AirTypeEnum>
            ).map((airType, index) => {
              return {
                title: AirTypeEnum[airType],
                value: AirTypeEnum[airType],
              };
            })}
            props={{
              name: "airType",
              value: room.airType,
              onChange: (event) =>
                setState(
                  setRoomParamsFromState(state, {
                    ...room,
                    airType: event.target.value as AirTypeEnum,
                  }),
                ),
            }}
          />
        ),
      },
      {
        name: "ширина, м",
        getter: (room: RoomType) => (
          <AppTextInput
            textfieldProps={{
              value: room.width,
              type: "number",
              inputProps: { max: 10, min: 1, step: 0.01 },
              onChange: (event) =>
                setState(
                  setRoomParamsFromState(state, {
                    ...room,
                    width: Number(event.target.value),
                    airConsumption: undefined,
                  }),
                ),
            }}
          />
        ),
      },
      {
        name: "длина, м",
        getter: (room: RoomType) => (
          <AppTextInput
            textfieldProps={{
              value: room.length,
              type: "number",
              inputProps: { max: 10, min: 1, step: 0.01 },
              onChange: (event) =>
                setState(
                  setRoomParamsFromState(state, {
                    ...room,
                    length: Number(event.target.value),
                    airConsumption: undefined,
                  }),
                ),
            }}
          />
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
        name: "кол-во людей",
        getter: (room: RoomType) => (
          <AppTextInput
            textfieldProps={{
              value: room.people,
              type: "number",
              inputProps: { max: 10, min: 1, step: 1 },
              onChange: (event) =>
                setState(
                  setRoomParamsFromState(state, {
                    ...room,
                    people: Number(event.target.value),
                  }),
                ),
            }}
          />
        ),
      },
      {
        name: "",
        getter: (room: RoomType, rowIndex) => roomDeleteButton(room, rowIndex),
      },
    ],
    rows: rooms,
  };

  return (
    <div className={clsx(css.container)}>
      <div className={css.title}>
        <h5>Добавить помещения</h5>
        <AppButton
          trailingComponent={<PlusIcon />}
          onClickCallback={() =>
            setState({
              ...state,
              floors: state.floors.map((floor, index) => {
                if (floor.number === props.activeFloor) {
                  return {
                    ...floor,
                    rooms: [
                      ...floor.rooms,
                      {
                        ...baseRoom,
                        number: floor.rooms.length + 1,
                        floor: props.activeFloor,
                      },
                    ],
                  };
                }
                return floor;
              }),
            })
          }
        />
      </div>
      <div className={css.table}>
        <PlannerTable id={"rooms-data"} data={tableData} />
        <div className={css.caption}>
          Добавьте необходимое количество помещений
        </div>
      </div>
    </div>
  );
}
