import * as React from "react";
import { ReactNode } from "react";
import clsx from "clsx";
import css from "./app-badge.module.scss";

type Props = {
  children: ReactNode;
  opacity?: boolean;
  white?: boolean;
  className?: string;
};

export default function AppBadge(props: Readonly<Props>) {
  return (
    <div
      className={clsx(
        css.container,
        {
          [css.container__opacity]: props.opacity,
          [css.container__white]: props.white,
        },
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
