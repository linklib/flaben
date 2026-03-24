import * as React from "react";
import clsx from "clsx";
import css from "./consumption-rate.module.scss";
import { AirConsumptionRateMap } from "@/utils/maps/air-consumption-rate.map";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";
import Switcher from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/switcher/switcher";

type Props = {};

export default function ConsumptionRate(props: Props) {
  const [state, setState] = useRecoilState(plannerState);

  return (
    <div className={clsx(css.container)}>
      <h5>
        Норма расхода воздуха (м<sup>3</sup> &frasl; <sub>ч</sub> на 1 человека)
      </h5>
      <Switcher
        id={"consumptionRate"}
        switchers={Array.from(AirConsumptionRateMap).map((rate) => {
          return {
            name: rate[0],
            active: state.consumptionRate === rate[1],
            onClick: () =>
              setState({
                ...state,
                consumptionRate: rate[1],
              }),
          };
        })}
      />
    </div>
  );
}
