"use client";
import * as React from "react";
import clsx from "clsx";
import css from "./swiper-articles.module.scss";
import { Navigation } from "swiper/modules";
import ArticleCard from "@/app/components/article-card/article-card";
import { ArticleType } from "@/types/dto/article/article.type";
import dynamic from "next/dynamic";

const SwiperBase = dynamic(
  () => import("@/app/components/swiper-base/swiper-base"),
  { ssr: false },
);

type Props = {
  articles: ArticleType[];
  nextButtonClass: string;
  previousButtonClass: string;
  replace?: boolean;
};

export default function SwiperArticles(props: Readonly<Props>) {
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
          {props.articles.map((article, index) => (
            <ArticleCard
              key={`${article.attributes.title}_${index}`}
              article={article}
              replace={props.replace}
            />
          ))}
        </SwiperBase>
      </div>
    </div>
  );
}
