import css from "./page.module.scss";
import * as React from "react";
import AppContainer from "@/app/components/app-container/app-container";
import AnimatedContainer from "@/app/components/animated-container/animated-container";
import { articleRepository } from "@/data/repositories/article.repository";
import ArticleCard from "@/app/components/article-card/article-card";

type Props = {
  searchParams: { category?: string };
};

export default async function Page(props: Readonly<Props>) {
  const activeCategory = props.searchParams?.category;

  const articlesResponse = await articleRepository.findAll(activeCategory);

  return (
    <AppContainer>
      <div className={css.projects}>
        <AnimatedContainer id={"articles"} className={css.projects__wrapper}>
          {
            articlesResponse.data?.data.map((article, index) => (
              <ArticleCard
                key={`${article.attributes.title}_${index}`}
                article={article}
              />
            )) as []
          }
        </AnimatedContainer>
      </div>
    </AppContainer>
  );
}
