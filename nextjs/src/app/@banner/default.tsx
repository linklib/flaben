"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./default.module.scss";
import Link from "next/link";
import { policyCookiesLink } from "@/utils/constants/constants";
import AppTextSpinner from "@/app/components/app-text-spinner/app-text-spinner";
import { Button } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export default function Default(props: Readonly<Props>) {
  const [opened, setOpened] = React.useState(true);
  return opened ? (
    <div className={clsx(css.container)}>
      <div className={css.container__inner}>
        <div className={css.container__banner}>
          <div className={css.container__text}>
            Мы используем файлы cookie, чтобы сделать использование сайта
            удобнее. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <Link href={policyCookiesLink} target={"_blank"}>
              <AppTextSpinner text={"Политика работы с куки (cookies)"} />
            </Link>
          </div>
          <div>
            <Button onClick={() => setOpened(false)} variant={"contained"}>
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
