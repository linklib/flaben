import css from "./page.module.scss";
import AppButton from "@/app/components/app-button/app-button";
import AppContainer from "@/app/components/app-container/app-container";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import { articleRepository } from "@/data/repositories/article.repository";
import SwiperArticles from "@/app/components/swiper-articles/swiper-articles";

export default async function Page() {
  const articleResponse = await articleRepository.findAll();

  return (
    <div className={css.container}>
      <AppContainer>
        <div className={css.header}>
          <div className={css.sectionTitle}>Статьи</div>
          <div className={css.title}>
            <h2 className={css.title__titleText}>
              <span>Секреты идеальной вентиляции: </span>
              создание комфортного микроклимата в вашем доме
            </h2>
            <div className={css.actions}>
              <Link href={siteLinks.articles.link()}>
                <AppButton text={"Показать все статьи"} />
              </Link>
              <div className={css.swiperButtons}>
                <div className={css.swiperButtons__previous}>
                  <AppButton leadingComponent={<ArrowIcon reverse />} />
                </div>
                <div className={css.swiperButtons__next}>
                  <AppButton leadingComponent={<ArrowIcon />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
      {articleResponse.data && (
        <SwiperArticles
          nextButtonClass={css.swiperButtons__next}
          previousButtonClass={css.swiperButtons__previous}
          articles={articleResponse.data.data}
        />
      )}
    </div>
  );
}
