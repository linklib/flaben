import * as React from "react";
import clsx from "clsx";
import css from "./product-price-view.module.scss";
import { toLocalPrice } from "@/utils/features/to-local-price";
import calcPriceWithSale from "@/utils/features/calcPriceWithSale";

type Props = {
  price: number;
  sale?: number;
  className?: string;
  vertical?: boolean;
};

export default function ProductPriceView(props: Readonly<Props>) {
  return (
    <div
      className={clsx(
        css.container,
        { [css.container__vertical]: props.vertical },
        props.className,
      )}
    >
      <div className={css.price}>
        {toLocalPrice(
          props.sale ? calcPriceWithSale(props.price, props.sale) : props.price,
        )}
      </div>
      {props.sale && (
        <div className={css.oldPrice}>{toLocalPrice(props.price)}</div>
      )}
    </div>
  );
}
