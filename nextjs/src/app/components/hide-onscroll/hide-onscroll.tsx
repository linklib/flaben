"use client";

import * as React from "react";
import clsx from "clsx";
import css from "./hide-onscroll.module.scss";
import { useRecoilState } from "recoil";
import { hideOnscrollState } from "@/state/hide-onscroll-state/hide-onscroll-state";
import { useMotionValueEvent, useScroll } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function HideOnscroll(props: Readonly<Props>) {
  const [hide, setHide] = useRecoilState(hideOnscrollState);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (prevValue) => {
    if (scrollY.get() < 200) {
      setHide(false);
    }
  });

  return (
    <div className={clsx(css.container, hide && css.container_hidden)}>
      {props.children}
    </div>
  );
}
