import * as React from "react";
import css from "./project-card.module.scss";
import { ProjectType } from "@/types/dto/project/project.type";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";

type Props = {
  project: ProjectType;
  replace?: boolean;
};

export default function ProjectCard(props: Props) {
  const project = props.project;

  return (
    <Link
      href={siteLinks.project.link(project.id.toString())}
      replace={props.replace}
    >
      <div className={css.project}>
        <div className={css.project__image}>
          <Image
            src={getBackendImage(project.attributes.image.data.attributes.url)}
            fill
            style={{ objectFit: "cover" }}
            alt={"project-title-image"}
          />
        </div>
        <h4 className={css.project__title}>{project.attributes.title}</h4>
      </div>
    </Link>
  );
}
