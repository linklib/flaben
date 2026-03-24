import * as React from "react";
import clsx from "clsx";
import css from "./floor-height.module.scss";
import AppTextInput from "@/app/components/app-text-input/app-text-input";
import { InputAdornment } from "@mui/material";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";

type Props = {
  activeFloor: number;
};

export default function FloorHeight(props: Props) {
  const [state, setState] = useRecoilState(plannerState);

  return (
    <div className={clsx(css.container)}>
      <h5>Укажите высоту потолков</h5>
      <div className={css.input}>
        <AppTextInput
          textfieldProps={{
            name: "height",
            type: "number",
            value: state.floors.find(
              (floor) => floor.number === props.activeFloor,
            )?.height as number,
            inputProps: {
              min: 1,
              step: 0.01,
              max: 8,
            },
            onChange: (event) =>
              setState({
                ...state,
                floors: state.floors.map((floor, index) => {
                  if (floor.number === props.activeFloor) {
                    return {
                      number: floor.number,
                      height: Number(event.target.value),
                      rooms: floor.rooms,
                    };
                  }
                  return floor;
                }),
              }),

            InputProps: {
              endAdornment: <InputAdornment position="end">м.</InputAdornment>,
            },
          }}
        />
      </div>
    </div>
  );
}
