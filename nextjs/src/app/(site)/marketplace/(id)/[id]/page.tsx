import css from "./page.module.scss";
import { productsRepository } from "@/data/repositories/products.repository";
import { siteLinks } from "@/utils/links/site-links";
import ProductSwiper from "@/app/(site)/marketplace/(id)/[id]/components/product-swiper/product-swiper";
import AppBreadcrumbs from "@/app/components/app-breadcrumbs/app-breadcrumbs";
import AppContainer from "@/app/components/app-container/app-container";
import AppPaper from "@/app/components/app-papper/app-paper";
import ProductCartButton from "@/app/components/product-cart-button/product-cart-button";
import clsx from "clsx";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";
import Link from "next/link";
import AppBadge from "@/app/components/app-badge/app-badge";
import ProductPriceView from "@/app/components/product-price-view/product-price-view";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default async function Page(props: Props) {
  const productResponse = await productsRepository.findOne(props.params.id);
  if (!productResponse.data) {
    notFound();
  }
  const product = productResponse.data.data;

  return (
    <AppContainer>
      <div className={css.container}>
        <div className={css.presentation}>
          <AppBreadcrumbs
            links={[
              {
                siteLink: siteLinks.marketplace,
                title: "Каталог",
                active: true,
              },
              {
                siteLink: siteLinks.marketplace,
                title: product.attributes.name,
              },
            ]}
          />
          <ProductSwiper
            imagesUrl={product.attributes.images.data.flatMap(
              (image) => image.attributes.url,
            )}
          />
        </div>
        <div className={css.details}>
          <div className={css.details__title}>
            <div className={css.secondary}>
              {product.attributes.category?.data.attributes.name}
            </div>
            <div className={css.details__titleWrapper}>
              <h2>{product.attributes.name}</h2>
              <div className={css.details__badges}>
                {product.attributes.sku && (
                  <AppBadge white>Артикул {product.attributes.sku}</AppBadge>
                )}
                {product.attributes.sale && (
                  <AppBadge className={css.details__sale}>
                    -{product.attributes.sale}%
                  </AppBadge>
                )}
              </div>
            </div>
          </div>
          <div className={css.details__params}>
            {product.attributes.values?.data.map((productParamValue) => (
              <div
                className={css.param}
                key={`${productParamValue.id}_param-value`}
              >
                <div className={clsx(css.param__name, css.secondary)}>
                  {productParamValue.attributes.param.data.attributes.name}
                </div>
                <div className={css.param__value}>
                  <span>{productParamValue.attributes.value}</span>
                  {productParamValue.attributes.param.data.attributes
                    .measure && (
                    <span>
                      {
                        productParamValue.attributes.param.data.attributes
                          .measure
                      }
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={css.details__priceWithButton}>
            <div className={css.details__price}>
              <ProductPriceView
                price={product.attributes.price}
                sale={product.attributes.sale}
                vertical
              />
            </div>
            <div className={css.details__button}>
              <ProductCartButton
                productId={product.id}
                text={"Добавить в корзину"}
              />
            </div>
          </div>

          <div className={css.info}>
            {product.attributes.description && (
              <AppPaper className={css.info__description}>
                <h4>Описание</h4>
                <div className={css.info__descriptionText}>
                  {product.attributes.description}
                </div>
              </AppPaper>
            )}
            {product.attributes.longDescription && (
              <AppPaper>
                <div className={css.info__spec}>
                  <h4>Характеристики</h4>
                  <Link
                    href={siteLinks.productSpec.link(product.id.toString())}
                  >
                    <AppButton
                      trailingComponent={<ArrowIcon />}
                      text={"Посмотреть"}
                      withDiagonalArrow
                    />
                  </Link>
                </div>
              </AppPaper>
            )}
          </div>
        </div>
      </div>
    </AppContainer>
  );
}
