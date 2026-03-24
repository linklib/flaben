"use client";

import * as React from "react";
import { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRecoilState } from "recoil";
import { hideOnscrollState } from "@/state/hide-onscroll-state/hide-onscroll-state";

type Props = {
  // children: React.ReactNode;
};

export default function ScrollHideTrigger(props: Props) {
  const ref = useRef(null);
  const [hide, setHide] = useRecoilState(hideOnscrollState);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!hide && scrollYProgress.get() < 0.25) {
      setHide(true);
    }
    if (hide && scrollYProgress.get() > 0.25) {
      setHide(false);
    }
  });

  return <div ref={ref} style={{ position: "absolute" }} />;
}
