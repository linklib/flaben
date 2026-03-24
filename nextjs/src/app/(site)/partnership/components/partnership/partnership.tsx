"use client";

import * as React from "react";
import { useState } from "react";
import css from "./partnership.module.scss";
import { AdvantageType } from "@/types/dto/advantage/advantage.type";
import AppPaper from "@/app/components/app-papper/app-paper";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import clsx from "clsx";
import PartnershipRequest from "@/app/components/partnership-request/partnership-request";
import { motion } from "framer-motion";

type Props = {
  partnershipAdvantages: AdvantageType[];
  heading?: string;
  description?: string;
};

export default function Partnership(props: Readonly<Props>) {
  const { partnershipAdvantages } = props;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const handleProjectImage = (type: "increase" | "decrease") => {
    setPrevIndex(activeImageIndex);
    if (type === "increase")
      setActiveImageIndex(
        activeImageIndex + 1 === partnershipAdvantages.length
          ? 0
          : activeImageIndex + 1,
      );
    else if (type === "decrease")
      setActiveImageIndex(
        activeImageIndex === 0
          ? partnershipAdvantages?.length - 1
          : activeImageIndex - 1,
      );
  };

  return (
    <div className={css.container}>
      <div className={clsx(css.paper, css.paper_outline, css.advantages)}>
        <div className={css.content}>
          <div className={css.content__text}>
            <div className={css.title}>
              <div className={css.title__section}>Стать партнером</div>
              <h3 className={css.title__text}>{props.heading}</h3>
            </div>
            <div className={css.body}>{props.description}</div>
          </div>
          <div className={css.footer}>
            <div className={css.footer__counter}>
              {activeImageIndex + 1}
              <span> / {props.partnershipAdvantages?.length}</span>
            </div>
            <div className={css.footer__actions}>
              <AppButton
                trailingComponent={<ArrowIcon reverse />}
                onClickCallback={() => handleProjectImage("decrease")}
              />
              <AppButton
                trailingComponent={<ArrowIcon />}
                onClickCallback={() => handleProjectImage("increase")}
              />
            </div>
          </div>
        </div>
      </div>
      <AppPaper className={clsx(css.paper, css.item)}>
        <div className={css.content}>
          <div className={css.content__text}>
            <div className={css.title}>
              <div className={css.title__section}>
                преимущества сотрудничества
              </div>
              <motion.h3 className={css.title__text}>
                {partnershipAdvantages[activeImageIndex]?.attributes.name
                  .split("")
                  .map((char, index) => (
                    <motion.div
                      key={`${char}_${index}_${activeImageIndex}`}
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.div>
                  ))}
              </motion.h3>
            </div>
            <div className={css.body}>
              {partnershipAdvantages[activeImageIndex]?.attributes.description}
            </div>
          </div>
          <PartnershipRequest>
            <AppButton
              text={"Стать партнёром"}
              trailingComponent={<ArrowIcon />}
              withDiagonalArrow
            />
          </PartnershipRequest>
        </div>
      </AppPaper>
    </div>
  );
}
