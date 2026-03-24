import * as React from "react";
import css from "./article-card.module.scss";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";
import { ArticleType } from "@/types/dto/article/article.type";

type Props = {
  article: ArticleType;
  replace?: boolean;
};

export default function ArticleCard(props: Readonly<Props>) {
  const { article } = props;

  return (
    <Link
      href={siteLinks.article.link(article.id.toString())}
      replace={props.replace}
    >
      <div className={css.project}>
        <div className={css.project__image}>
          <Image
            src={getBackendImage(article.attributes.image.data.attributes.url)}
            fill
            style={{ objectFit: "cover" }}
            alt={"project-title-image"}
          />
        </div>
        <h4 className={css.project__title}>{article.attributes.title}</h4>
      </div>
    </Link>
  );
}
