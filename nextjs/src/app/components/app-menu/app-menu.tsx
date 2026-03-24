"use client";

import * as React from "react";
import css from "./app-menu.module.scss";
import { Drawer } from "@mui/material";
import AppElementDecor from "@/app/components/app-element-decor/app-element-decor";
import PlusIcon from "@/app/components/icons/plus.icon";

type Props = {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onClose: () => void;
};

export default function AppMenu(props: Readonly<Props>) {
  return (
    <Drawer open={props.open} anchor={"right"} onClose={() => props.onClose()}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{props.title}</h2>
          <button className={css.header__close} onClick={() => props.onClose()}>
            <AppElementDecor active>
              <PlusIcon />
            </AppElementDecor>
          </button>
        </div>
        <div className={css.body}>{props.children}</div>
      </div>
    </Drawer>
  );
}
