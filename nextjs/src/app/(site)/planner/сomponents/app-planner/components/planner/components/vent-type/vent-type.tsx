import * as React from "react";
import clsx from "clsx";
import css from "./vent-type.module.scss";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";
import Switcher from "@/app/(site)/planner/сomponents/app-planner/components/planner/components/switcher/switcher";
import { VentilationSystemTypeEnum } from "@/utils/enums/ventilation-system-type.enum";

type Props = {};

export default function VentType(props: Props) {
  const [state, setState] = useRecoilState(plannerState);

  return (
    <div className={clsx(css.container)}>
      <h5>Выберите тип системы вентиляции</h5>
      <Switcher
        id={"systemType"}
        switchers={(
          Object.keys(VentilationSystemTypeEnum) as Array<
            keyof typeof VentilationSystemTypeEnum
          >
        ).map((rate) => {
          return {
            name: VentilationSystemTypeEnum[rate],
            active: state.systemType === VentilationSystemTypeEnum[rate],
            onClick: () =>
              setState({
                ...state,
                systemType: VentilationSystemTypeEnum[rate],
              }),
          };
        })}
      />
    </div>
  );
}
