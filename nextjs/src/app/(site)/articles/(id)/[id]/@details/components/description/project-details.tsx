"use client";

import * as React from "react";
import { useState } from "react";
import css from "./project-details.module.scss";
import AppPaper from "@/app/components/app-papper/app-paper";
import AppReturn from "@/app/components/app-return/app-return";
import ReturnArrow from "@/app/components/icons/return-arrow";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import Image from "next/image";
import { ProjectType } from "@/types/dto/project/project.type";
import { getBackendImage } from "@/utils/features/get-backend-image";

type Props = {
  project: ProjectType;
};

export default function ProjectDetails(props: Readonly<Props>) {
  const { project } = props;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [, setPrevIndex] = useState(0);

  const handleProjectImage = (type: "increase" | "decrease") => {
    setPrevIndex(activeImageIndex);
    if (type === "increase")
      setActiveImageIndex(
        activeImageIndex + 1 === project.attributes.images.data.length
          ? 0
          : activeImageIndex + 1,
      );
    else if (type === "decrease")
      setActiveImageIndex(
        activeImageIndex === 0
          ? project.attributes.images.data.length - 1
          : activeImageIndex - 1,
      );
  };

  return (
    <div className={css.container}>
      <AppPaper className={css.paper}>
        <AppReturn className={css.return}>
          <ReturnArrow />
          <span>Все статьи</span>
        </AppReturn>
        <div className={css.content}>
          <div className={css.content__text}>
            <div className={css.title}>
              <div className={css.title__section}>
                Использование в интерьере
              </div>
              <h2 className={css.title__text}>{project.attributes.title}</h2>
            </div>
            <div className={css.body}>
              <BlocksRenderer content={project.attributes.description} />
            </div>
          </div>

          <div className={css.footer}>
            <div className={css.footer__counter}>
              {activeImageIndex + 1}
              <span> / {project.attributes.images.data.length}</span>
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
      </AppPaper>
      <AppPaper className={css.image}>
        <Image
          src={getBackendImage(
            project.attributes.images.data[activeImageIndex].attributes.url,
          )}
          alt={"projects-image"}
          fill
          style={{ objectFit: "cover" }}
        />
      </AppPaper>
    </div>
  );
}
