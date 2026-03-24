"use client";

import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  VariantLabels,
  Variants,
} from "framer-motion";

import * as React from "react";
import AnimatedItem from "@/app/components/animated-item/animated-item";

type Props = {
  children: React.ReactNode[];
  className: string;
  id: string;
};

export default function AnimatedContainer(props: Props) {
  const visibleLabel = "visible";
  const hiddenLabel = "hidden";

  return (
    <motion.div className={props.className} initial="hidden" animate="visible">
      <AnimatePresence>
        {props.children?.map((node, index) => {
          const LIST_ITEM_VARIANTS: Variants = {};

          LIST_ITEM_VARIANTS[visibleLabel] = {
            scale: 1,
            opacity: 1,
            translateY: 0,
          };

          LIST_ITEM_VARIANTS[hiddenLabel] = {
            scale: 0.9,
            opacity: 0,
            translateY: -300,
          };

          const exit: TargetAndTransition | VariantLabels = {
            scale: 0.8,
            translateY: 300,
            opacity: 0,
          };

          return (
            <AnimatedItem
              key={`animated_item_${props.id}_${index}`}
              variants={LIST_ITEM_VARIANTS}
              exit={exit}
              index={index}
            >
              {node}
            </AnimatedItem>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
