import * as React from "react";
import { productCategoryRepository } from "@/data/repositories/product-category.repository";
import AppContainer from "@/app/components/app-container/app-container";
import AppPaper from "@/app/components/app-papper/app-paper";
import css from "@/app/(site)/marketplace/(marketplace-index)/categories/[category]/@products/page.module.scss";
import ScrollHideTrigger from "@/app/components/scroll-hide-trigger/scroll-hide-trigger";
import AppFilters from "@/app/components/app-filters/app-filters";
import CartButton from "@/app/components/cart-button/cart-button";
import OnChangePathnameScroll from "@/app/(site)/marketplace/(marketplace-index)/categories/[category]/@products/components/on-change-pathname-scroll";
import Search from "@/app/(site)/marketplace/(marketplace-index)/categories/[category]/@products/components/search/search";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const categoryResponse = await productCategoryRepository.findAll();
  const currentCategory = categoryResponse.data?.data.find(
    (category) => category.attributes.slug === params.category,
  );

  const categoryName = currentCategory?.attributes.name ?? "Каталог";

  return {
    title: `Fliben | ${categoryName}`,
    description:
      "Каталог товаров Fliben. Широкий ассортимент товаров для монтажа вентиляции. Полный набор комплектующих в одном месте. Бесплатная доставка.",
  };
}

type Props = {
  promotions: React.ReactNode;
  children: React.ReactNode;
  products: React.ReactNode;
  params: {};
  searchParams: {
    category?: string;
  };
};

export default async function Layout(props: Readonly<Props>) {
  const categoryResponse = await productCategoryRepository.findAll();

  return (
    <div>
      {props.promotions}
      <AppContainer>
        <AppPaper className={css.container} noOverflow>
          <OnChangePathnameScroll />
          <div className={css.products}>
            {categoryResponse.data && (
              <div className={css.products__filters}>
                <h2 className={css.products__title}>Каталог</h2>
                <div className={css.products__filterInner}>
                  <ScrollHideTrigger />
                  <Search />
                  <AppFilters
                    activeFilterName={props.searchParams?.category}
                    filters={categoryResponse.data.data.flatMap((category) => {
                      return {
                        name: category.attributes.slug,
                        title: category.attributes.name,
                        field: "category",
                      };
                    })}
                    barEl={<CartButton />}
                  />
                </div>
              </div>
            )}
            {props.products}
            {props.children}
          </div>
        </AppPaper>
      </AppContainer>
    </div>
  );
}
