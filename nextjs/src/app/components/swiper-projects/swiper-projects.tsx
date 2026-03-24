"use client";
import * as React from "react";
import clsx from "clsx";
import css from "./swiper-projects.module.scss";
import { ProjectType } from "@/types/dto/project/project.type";
import { Navigation } from "swiper/modules";
import ProjectCard from "@/app/components/project-card/project-card";
import dynamic from "next/dynamic";

const SwiperBase = dynamic(
  () => import("@/app/components/swiper-base/swiper-base"),
  { ssr: false },
);

type Props = {
  projects: ProjectType[];
  nextButtonClass: string;
  previousButtonClass: string;
  replace?: boolean;
};

export default function SwiperProjects(props: Readonly<Props>) {
  return (
    <div className={clsx(css.container)}>
      <div className={css.swiperContainer}>
        <SwiperBase
          swiperProps={{
            className: css.swiper,
            modules: [Navigation],
            navigation: {
              prevEl: `.${props.previousButtonClass}`,
              nextEl: `.${props.nextButtonClass}`,
            },
            spaceBetween: 20,
          }}
          laptopOptions={{ slidesPerView: 3 }}
          tabletOptions={{ slidesPerView: 2 }}
          phoneOptions={{ slidesPerView: 1 }}
        >
          {props.projects.map((project, index) => (
            <ProjectCard
              key={`${project.attributes.title}_${index}`}
              project={project}
              replace={props.replace}
            />
          ))}
        </SwiperBase>
      </div>
    </div>
  );
}
