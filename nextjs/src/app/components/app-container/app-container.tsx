import * as React from "react";
import css from "./app-container.module.scss";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AppContainer(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container, props.className)}>{props.children}</div>
  );
}
