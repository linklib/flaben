"use client";

import {
  motion,
  TargetAndTransition,
  VariantLabels,
  Variants,
} from "framer-motion";

import * as React from "react";

type Props = {
  children: React.ReactNode;
  index: number;
  variants: Variants;
  exit: TargetAndTransition | VariantLabels;
};

export default function AnimatedItem(props: Props) {
  return (
    <motion.div
      layout
      variants={props.variants}
      exit={props.exit}
      style={{ display: "grid" }}
    >
      {props.children}
    </motion.div>
  );
}
