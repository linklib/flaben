import * as React from "react";
import clsx from "clsx";
import css from "./floors-result.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function FloorsResult(props: Props) {
  return <div className={clsx(css.container)}></div>;
}
