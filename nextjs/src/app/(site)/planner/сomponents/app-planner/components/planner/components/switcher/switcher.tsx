import * as React from "react";
import { MouseEventHandler } from "react";
import css from "./switcher.module.scss";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  id: string;
  switchers: {
    name: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    active: boolean;
    badge?: React.ReactNode;
  }[];
};

export default function Switcher(props: Props) {
  return (
    <div className={css.container}>
      <AnimatePresence>
        {props.switchers.map((el) => (
          <motion.div
            key={`switch_${el.name}`}
            className={clsx(css.el, el.active && css.el_active)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button onClick={el.onClick}>
              {el.name}
              {el.active && (
                <motion.div
                  className={css.activeBackground}
                  layoutId={props.id}
                />
              )}
            </button>
            {el.badge && <div className={css.badge}>{el.badge}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
