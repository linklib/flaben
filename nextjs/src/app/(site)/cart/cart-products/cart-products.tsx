import * as React from "react";
import clsx from "clsx";
import css from "./cart-products.module.scss";
import { ProductType } from "@/types/dto/product/product.type";
import ProductCartButton from "@/app/components/product-cart-button/product-cart-button";
import AppPaper from "@/app/components/app-papper/app-paper";
import { toLocalPrice } from "@/utils/features/to-local-price";
import Image from "next/image";
import { getBackendImage } from "@/utils/features/get-backend-image";

type Props = {
  products?: ProductType[];
  disabled?: boolean;
};
export default function CartProducts(props: Props) {
  return (
    <AppPaper className={clsx(css.container)}>
      {props.products?.map((product, index) => (
        <div
          key={`${product.attributes.name}_cart-product`}
          className={clsx(
            css.product,
            index + 1 === props.products?.length && css.product_last,
          )}
        >
          <div className={css.title}>
            <div className={css.image}>
              <Image
                src={getBackendImage(
                  product.attributes.image.data.attributes.url,
                )}
                alt={"product-cart-image"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={css.name}>{product.attributes.name}</div>
          </div>
          <div className={css.price}>
            {toLocalPrice(product.attributes.price)}
          </div>
          <div className={css.button}>
            <ProductCartButton
              productId={product.id}
              staticCount={product.amount}
              disabled={props.disabled}
            />
          </div>
        </div>
      ))}
    </AppPaper>
  );
}
