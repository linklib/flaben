import * as React from "react";
import clsx from "clsx";
import css from "./app-form.module.scss";
import { AppInput } from "@/types/inputs";
import AppTextInput from "@/app/components/app-text-input/app-text-input";
import AppButton from "@/app/components/app-button/app-button";
import Link from "next/link";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";
import {
  policyAgreementlLink,
  policyDocLink,
} from "@/utils/constants/constants";
import ArrowIcon from "@/app/components/icons/arrow.icon";

type Props = {
  inputs: AppInput[][];
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
  title?: string;
  verticalFooter?: boolean;
  done?: boolean;
};

export default function AppForm(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container)}>
      <form
        {...props.props}
        className={clsx(css.form, props.done && css.form_done)}
      >
        <div className={clsx(css.body)}>
          <div className={css.title}>{props.title}</div>
          <div className={css.inputs}>
            {props.inputs.map((inputs, index) => (
              <div key={`${index}_input_row`} className={css.inputRow}>
                {inputs.map(
                  (input) =>
                    input.type === "text" && (
                      <AppTextInput
                        key={`${input.props.name}_input`}
                        textfieldProps={input.props}
                        mask={input.mask}
                      />
                    ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className={clsx(
            css.footer,
            props.verticalFooter && css.footer_vertical,
          )}
        >
          <div className={css.caption}>
            <span>Нажимая на кнопку вы соглашаетесь с</span>
            <div>
              <Link href={policyAgreementlLink} target={"_blank"}>
                <AppTextSpinner
                  text={"Согласие на обработку персональных данных"}
                />
              </Link>
            </div>
            и
            <div>
              <Link href={policyDocLink} target={"_blank"}>
                <AppTextSpinner
                  text={"Политика обработки персональных данных"}
                />
              </Link>
            </div>
          </div>
          <AppButton
            text={"Отправить заявку"}
            trailingComponent={<ArrowIcon />}
            withDiagonalArrow
          />
        </div>
      </form>
      {props.done && (
        <div className={css.placeholder}>
          Ваша заявка принята <span>Мы перезвоним в ближайшее время!</span>
        </div>
      )}
    </div>
  );
}
