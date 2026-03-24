"use client";

import * as React from "react";
import css from "./cart-info.module.scss";
import { toLocalPrice } from "@/utils/features/to-local-price";
import Link from "next/link";
import { siteLinks } from "@/utils/links/site-links";
import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";
import { cartStorage } from "@/utils/features/cart-storage";

type Props = {
  amount?: number;
  price?: number;
  request?: boolean;
};

export default function CartInfo(props: Readonly<Props>) {
  const status = useFormStatus();

  return (
    <div className={css.info}>
      <div className={css.info__info}>
        <h4>{props.request ? "Ваш заказ" : "Корзина"}</h4>
        <div className={css.info__details}>
          <div className={css.info__row}>
            <div className={css.info__field}>Товаров</div>
            <div className={css.info__value}>{props.amount} шт.</div>
          </div>
          <div className={css.info__row}>
            <div className={css.info__field}>Общая стоимость</div>
            <div className={css.info__value}>{toLocalPrice(props.price)}</div>
          </div>
        </div>
      </div>
      {props.request ? (
        <Button variant={"contained"} type={"submit"} disabled={status.pending}>
          Оформить
        </Button>
      ) : (
        <div className={css.buttons}>
          <Button variant={"outlined"} onClick={() => cartStorage.emptyCart()}>
            Очистить корзину
          </Button>
          <Link href={siteLinks.cartRequest.link()}>
            <Button variant={"contained"}>Перейти к оформлению</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
