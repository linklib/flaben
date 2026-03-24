import * as React from "react";
import clsx from "clsx";
import css from "./systems-summary.module.scss";
import AppElementDecor from "@/app/components/app-element-decor/app-element-decor";
import PlusIcon from "@/app/components/icons/plus.icon";

type Props = {
  index: number;
  text: string;
  expanded: boolean;
};

export default function SystemsSummary(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container)}>
      <div className={css.counter}>
        {(props.index + 1).toString().padStart(2, "0")}
      </div>
      <div className={css.title}>
        <h4>{props.text}</h4>
        <div className={clsx(css.icon, props.expanded && css.icon__expanded)}>
          <AppElementDecor active>
            <PlusIcon />
          </AppElementDecor>
        </div>
      </div>
    </div>
  );
}
