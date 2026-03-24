"use client";

import * as React from "react";
import AppMenu from "@/app/components/app-menu/app-menu";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const router = useRouter();

  return (
    <AppMenu title={"Заявка на обратный звонок"} open onClose={router.back}>
      {props.children}
    </AppMenu>
  );
}
