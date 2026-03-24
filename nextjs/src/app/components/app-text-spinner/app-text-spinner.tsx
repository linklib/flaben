"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./app-text-spinner.module.scss";

type Props = {
  text?: string;
  className?: string;
};

export default function AppTextSpinner(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container, props.className)}>
      <span>{props.text}</span>
      <span>{props.text}</span>
    </div>
  );
}
