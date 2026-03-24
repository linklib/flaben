import * as React from "react";
import clsx from "clsx";
import css from "./product-card.module.scss";
import { ProductType } from "@/types/dto/product/product.type";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";
import ProductCartButton from "@/app/components/product-cart-button/product-cart-button";
import AppBadge from "@/app/components/app-badge/app-badge";
import ProductPriceView from "@/app/components/product-price-view/product-price-view";

type Props = {
  product: ProductType;
};

export default function ProductCard(props: Readonly<Props>) {
  const { product } = props;
  const sale = props.product.attributes.sale;
  return (
    <div className={clsx(css.container)}>
      <Link href={siteLinks.product.link(props.product.id.toString())}>
        <div className={css.details}>
          <div className={css.image}>
            <Image
              src={getBackendImage(
                product.attributes.image.data.attributes.url,
              )}
              alt={"product-image"}
              fill
              style={{ objectFit: "contain", padding: "0.625rem" }}
              quality={100}
            />
            <div className={css.badges}>
              {props.product.attributes.sku && (
                <AppBadge opacity>Арт. {product.attributes.sku}</AppBadge>
              )}

              {sale && <AppBadge className={css.sale}>-{sale}%</AppBadge>}
            </div>
          </div>
          <div className={css.title}>
            <div className={css.name}>{product.attributes.name}</div>
            <ProductPriceView
              price={product.attributes.price}
              sale={sale}
              className={css.price}
            />
          </div>
        </div>
      </Link>
      <div className={css.button}>
        <ProductCartButton productId={product.id} />
      </div>
    </div>
  );
}
