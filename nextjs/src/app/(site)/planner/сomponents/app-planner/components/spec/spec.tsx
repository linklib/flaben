import * as React from "react";
import { useState } from "react";
import clsx from "clsx";
import css from "./spec.module.scss";
import CartProducts from "@/app/(site)/cart/cart-products/cart-products";
import { ProductType } from "@/types/dto/product/product.type";
import AppPaper from "@/app/components/app-papper/app-paper";
import PlannerProductsTotal from "@/app/(site)/planner/сomponents/app-planner/components/spec/components/planner-products-total/planner-products-total";

export default function Spec() {
  const [products, setProducts] = useState(
    null as unknown as ProductType[] | null,
  );

  return (
    <div className={clsx(css.container)}>
      {products ? (
        <CartProducts products={products} disabled />
      ) : (
        <AppPaper className={css.placeholder}>
          {'Нажмите "Раcсчитать", чтобы получить список товаров'}
          <br />
          {"с актуальными ценами согласно конфигурации помещений"}
        </AppPaper>
      )}
      <AppPaper className={css.total} noOverflow>
        <PlannerProductsTotal products={products} setProducts={setProducts} />
      </AppPaper>
    </div>
  );
}
