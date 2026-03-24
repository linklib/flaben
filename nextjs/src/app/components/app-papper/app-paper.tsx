import * as React from "react";
import clsx from "clsx";
import css from "./app-paper.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
  noOverflow?: boolean;
};

export default function AppPaper(props: Readonly<Props>) {
  return (
    <div
      className={clsx(
        css.container,
        props.noOverflow && css.container__noOverflow,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
