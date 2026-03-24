"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import css from "./cart-button.module.scss";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import AppButton from "@/app/components/app-button/app-button";
import { cartStorage } from "@/utils/features/cart-storage";
import { storageEventName } from "@/utils/constants/constants";

export default function CartButton() {
  const [cartProductsAmount, setCartProductsAmount] = useState(0 as number);

  const getCartProductsAmount = () => {
    const cart = cartStorage.getOrCreateCart();
    if (cart.products.length === 0) {
      return 0;
    }
    return cart.products
      .flatMap((product) => product.amount)
      .reduce((previousValue, currentValue) => (previousValue += currentValue));
  };

  useEffect(() => {
    const cartProduct = cartStorage.getOrCreateCart();
    if (cartProduct) {
      setCartProductsAmount(getCartProductsAmount());
    }

    const cartProductsEventHandler = () => {
      setCartProductsAmount(getCartProductsAmount());
    };

    window.addEventListener(storageEventName, cartProductsEventHandler);
    return () =>
      window.removeEventListener(storageEventName, cartProductsEventHandler);
  }, []);

  return (
    <Link href={siteLinks.cart.link()} scroll>
      <AppButton
        text={"Корзина"}
        trailingComponent={
          <div className={css.counter}>{cartProductsAmount}</div>
        }
      />
    </Link>
  );
}
