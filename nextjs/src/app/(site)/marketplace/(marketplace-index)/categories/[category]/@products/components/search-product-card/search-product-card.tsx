import * as React from "react";
import clsx from "clsx";
import css from "./search-product-card.module.scss";
import { ProductType } from "@/types/dto/product/product.type";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import AppBadge from "@/app/components/app-badge/app-badge";
import ProductPriceView from "@/app/components/product-price-view/product-price-view";

type Props = {
  product: ProductType;
  last?: boolean;
};

export default function SearchProductCard(props: Readonly<Props>) {
  return (
    <div className={css.wrapper}>
      <Link href={siteLinks.product.link(props.product.id.toString())}>
        <div className={clsx(css.container)}>
          <div className={css.container__common}>
            <div className={css.container__image}>
              <Image
                src={getBackendImage(
                  props.product.attributes.image.data.attributes.url,
                )}
                alt={
                  props.product.attributes.image.data.attributes
                    .alternativeText as string
                }
                fill
              />
            </div>
            <div className={css.container__info}>
              <div className={css.container__name}>
                {props.product.attributes.name}
              </div>
              <div className={css.container__badges}>
                {props.product.attributes.sku && (
                  <AppBadge className={css.container__sku}>
                    Артикул {props.product.attributes.sku}
                  </AppBadge>
                )}
                {props.product.attributes.sale && (
                  <AppBadge className={css.container__sale}>
                    -{props.product.attributes.sale}%
                  </AppBadge>
                )}
              </div>
            </div>
          </div>
          <ProductPriceView
            price={props.product.attributes.price}
            sale={props.product.attributes.sale}
            className={css.container__price}
          />
        </div>
      </Link>
      {!props.last && <div className={css.wrapper__divider} />}
    </div>
  );
}
