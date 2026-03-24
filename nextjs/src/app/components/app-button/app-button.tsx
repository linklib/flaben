"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./app-button.module.scss";
import AppElementDecor from "@/app/components/app-element-decor/app-element-decor";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";
import { useFormStatus } from "react-dom";

type Props = {
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  red?: boolean;
  text?: string;
  leadingComponent?: React.ReactNode;
  trailingComponent?: React.ReactNode;
  withDiagonalArrow?: boolean;
  onClickCallback?: () => void;
};

export default function AppButton(props: Readonly<Props>) {
  const formStatus = useFormStatus();

  return (
    <button
      {...props.buttonProps}
      className={clsx(
        css.container,
        props.withDiagonalArrow && css.container__withDiagonalArrow,
        props.buttonProps?.className,
        props.red && css.container_red,
      )}
      onClick={props.onClickCallback}
      disabled={props.buttonProps?.disabled ?? formStatus.pending}
    >
      <span className={css.container__side}>
        {props.leadingComponent && (
          <AppElementDecor className={css.decor}>
            {props.leadingComponent}
          </AppElementDecor>
        )}
      </span>

      {props.text && (
        <AppElementDecor className={css.decor} button>
          <AppTextSpinner text={props.text} className={css.textSpinner} />
        </AppElementDecor>
      )}
      <span className={css.container__side}>
        {props.trailingComponent && (
          <AppElementDecor className={css.decor}>
            {props.trailingComponent}
          </AppElementDecor>
        )}
      </span>
    </button>
  );
}
