import * as React from "react";
import clsx from "clsx";
import css from "./app-element-decor.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
  button?: boolean;
  active?: boolean;
};

export default function AppElementDecor(props: Readonly<Props>) {
  return (
    <div
      className={clsx(
        css.container,
        props.className,
        props.button && css.container_button,
        props.active && css.container_active,
      )}
    >
      {props.children}
    </div>
  );
}
