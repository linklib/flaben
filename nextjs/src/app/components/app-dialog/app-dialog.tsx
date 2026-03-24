"use client";

import * as React from "react";
import { Dialog } from "@mui/material";
import AppPaper from "@/app/components/app-papper/app-paper";
import css from "./app-dialog.module.scss";
import AppButton from "@/app/components/app-button/app-button";
import { useRouter } from "next/navigation";
import PlusIcon from "@/app/components/icons/plus.icon";

type Props = {
  children: React.ReactNode;
  title: string;
  className?: string;
  open?: boolean;
};

export default function AppDialog(props: Props) {
  const router = useRouter();

  const closeAction = () => {
    router.back();
  };

  return (
    <Dialog
      className={props.className}
      open={props.open ?? true}
      onClose={closeAction}
    >
      <AppPaper>
        <div className={css.container}>
          <div className={css.header}>
            <h2>{props.title}</h2>
            <AppButton
              leadingComponent={<PlusIcon />}
              onClickCallback={closeAction}
            />
          </div>
          <div> {props.children}</div>
        </div>
      </AppPaper>
    </Dialog>
  );
}
