import * as React from "react";
import clsx from "clsx";
import css from "./planner-section.module.scss";
import Logo from "@/app/components/logo/logo";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function PlannerSection(props: Props) {
  return (
    <div className={clsx(css.container)}>
      <div className={css.header}>
        <div className={css.title}>{props.title}</div>
        <div className={css.logo}>
          <Logo />
        </div>
      </div>
      <div className={css.body}>{props.children}</div>
    </div>
  );
}
