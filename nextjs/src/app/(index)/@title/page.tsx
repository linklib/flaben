import css from "./page.module.scss";
import AppPaper from "@/app/components/app-papper/app-paper";
import AppContainer from "@/app/components/app-container/app-container";
import Image from "next/image";
import AppButton from "@/app/components/app-button/app-button";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import { productCategoryRepository } from "@/data/repositories/product-category.repository";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import { contentRepository } from "@/data/repositories/content.repository";
import AppRichText from "@/app/components/app-rich-text/app-rich-text";

export default async function Page() {
  const categoryResponse = productCategoryRepository.findAll();
  const titleTextResponse = contentRepository.getTitleText();
  const descriptionTextResponse = contentRepository.getTitleDescription();

  const [categoriesData, titleTextData, titleDescriptionData] =
    await Promise.all([
      categoryResponse,
      titleTextResponse,
      descriptionTextResponse,
    ]);

  const filteredCategories = categoriesData.data?.data.filter(
    (_, index) => index < 3,
  );

  return (
    <AppContainer>
      <div className={css.container}>
        <AppPaper>
          <div className={css.description}>
            <div className={css.description__body}>
              <h1 className={css.description__title}>
                {titleTextData.data?.data.attributes.text}
              </h1>
              <div className={css.description__description}>
                <AppRichText
                  content={titleDescriptionData.data?.data.attributes.text}
                />
              </div>
              <div></div>
            </div>
            <div className={css.description__footer}>
              {/*<span>Лучшие условия на рынке для наших партнеров</span>*/}
              <Link href={siteLinks.partnership.link()}>
                <AppButton
                  text={"Подробнее"}
                  trailingComponent={<ArrowIcon />}
                  withDiagonalArrow
                />
              </Link>
            </div>
          </div>
        </AppPaper>
        {filteredCategories && (
          <div className={css.categories}>
            {filteredCategories.map((category) => (
              <AppPaper key={`${category.attributes.slug}_category`}>
                <div className={css.category}>
                  <div className={css.category__info}>
                    <div className={css.category__body}>
                      <h4>{category.attributes.name}</h4>
                      <div className={css.category__description}>
                        {category.attributes.description}
                      </div>
                    </div>
                    <div className={css.category__button}>
                      <Link
                        href={`${siteLinks.marketplace.link()}/categories/${category.attributes.slug}`}
                      >
                        <AppButton
                          trailingComponent={<ArrowIcon />}
                          text={"В каталог"}
                          withDiagonalArrow
                        />
                      </Link>
                    </div>
                  </div>
                  <div className={css.category__image}>
                    <Image
                      src={`/files${category.attributes.image.data.attributes.url}`}
                      alt={"product_category_image"}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </AppPaper>
            ))}
          </div>
        )}
      </div>
    </AppContainer>
  );
}
