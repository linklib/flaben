"use client";

import css from "./page.module.scss";
import AppContainer from "@/app/components/app-container/app-container";
import AppPaper from "@/app/components/app-papper/app-paper";
import CartInfo from "@/app/(site)/cart/cart-info/cart-info";
import CartProducts from "@/app/(site)/cart/cart-products/cart-products";
import { useCartValues } from "@/utils/hooks/cart-hook";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import AppButton from "@/app/components/app-button/app-button";
import ArrowIcon from "@/app/components/icons/arrow.icon";

export default function Page() {
  const { amount, price, products } = useCartValues();

  return (
    <AppContainer>
      {products ? (
        <div className={css.container}>
          <h2>Корзина</h2>
          <div className={css.page}>
            {<CartProducts products={products} />}
            <div className={css.cart}>
              <AppPaper noOverflow>
                <CartInfo amount={amount} price={price} />
              </AppPaper>
            </div>
          </div>
        </div>
      ) : (
        <AppPaper className={css.placeholder}>
          <div className={css.placeholder__title}>
            <h4>Корзина пуста</h4>
            <span>Перейдите в каталог, чтобы добавить товары в корзину</span>
          </div>
          <div>
            <Link href={siteLinks.marketplace.link()}>
              <AppButton
                text={"В каталог"}
                trailingComponent={<ArrowIcon />}
                withDiagonalArrow
              />
            </Link>
          </div>
        </AppPaper>
      )}
    </AppContainer>
  );
}
