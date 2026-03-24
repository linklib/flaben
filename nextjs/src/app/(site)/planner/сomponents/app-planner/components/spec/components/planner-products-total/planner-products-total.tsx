"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import css from "./planner-products-total.module.scss";
import { Button } from "@mui/material";
import { ProductType } from "@/types/dto/product/product.type";
import { productsRepository } from "@/data/repositories/products.repository";
import { cartStorage } from "@/utils/features/cart-storage";
import { getProductsFromPlannerState } from "@/utils/features/get-products-from-planner-state";
import { toLocalPrice } from "@/utils/features/to-local-price";
import { useRecoilState } from "recoil";
import { plannerState } from "@/state/planner-state/planner-state";
import { getConsumptionVolumeByType } from "@/utils/features/get-consumption-volume-by-type";
import { AirTypeEnum } from "@/utils/enums/air-type.enum";

type Props = {
  products: ProductType[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
};
export default function PlannerProductsTotal(props: Readonly<Props>) {
  const [state] = useRecoilState(plannerState);
  const [calculated, setCalculated] = useState(false);
  const [pending, startTransition] = useTransition();

  const calculate = () =>
    startTransition(async () => {
      const totalExhaustConsumption = getConsumptionVolumeByType(
        state.floors,
        AirTypeEnum.Exhaust,
      );
      const totalSupplyConsumption = getConsumptionVolumeByType(
        state.floors,
        AirTypeEnum.Supply,
      );
      const error =
        totalSupplyConsumption / totalExhaustConsumption < 0.9 ||
        totalSupplyConsumption / totalExhaustConsumption > 1.1;

      if (error)
        alert(
          "Разница между общим расходом приточного и вытяжного воздуха не может превышать 10%",
        );
      else {
        const plannerProducts = getProductsFromPlannerState(state);

        const plannerProductsIds = plannerProducts.flatMap(
          (product) => product.id,
        );
        const productsResponse =
          await productsRepository.findAll(plannerProductsIds);
        const products = productsResponse.data?.data;
        if (products) {
          const productsWithAmount = products.map((systemProduct) => {
            return {
              ...systemProduct,
              amount:
                plannerProducts.find(
                  (plannerProduct) => plannerProduct.id === systemProduct.id,
                )?.amount ?? 1,
            };
          });

          setCalculated(true);
          props.setProducts(productsWithAmount);
        } else {
          alert("Не удалось получить данные о товарах, попробуйте позднее");
        }
      }
    });

  const products = props.products;

  const productsAmount = props.products?.flatMap(
    (plannerProduct) => plannerProduct.amount ?? 0,
  );

  const totalProductsAmount =
    productsAmount && productsAmount.length > 0
      ? productsAmount.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
        )
      : 0;

  const productsPrices = products?.flatMap(
    (plannerProduct) =>
      plannerProduct.attributes.price * (plannerProduct.amount ?? 0),
  );

  const plannerTotalPrice =
    productsPrices && productsPrices.length > 0
      ? productsPrices.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
        )
      : 0;

  const addProductsToCart = () => {
    if (props.products) {
      cartStorage.addProducts(
        props.products.flatMap((product) => {
          return { id: product.id, amount: product.amount ?? 1 };
        }),
      );
      alert("Товары успешно добавлены в корзину");
    } else alert("Нет товаров для добавления в корзину");
  };

  return (
    <div className={css.info}>
      <div className={css.info__info}>
        <h4>{"Итого"}</h4>
        <div className={css.info__details}>
          <div className={css.info__row}>
            <div className={css.info__field}>Товаров</div>
            <div className={css.info__value}>{totalProductsAmount} шт.</div>
          </div>
          <div className={css.info__row}>
            <div className={css.info__field}>Общая стоимость</div>
            <div className={css.info__value}>
              {toLocalPrice(plannerTotalPrice)}
            </div>
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Button
          variant={"outlined"}
          type={"submit"}
          onClick={calculate}
          disabled={pending}
        >
          {calculated ? "Рассчитать заново" : "Рассчитать"}
        </Button>
        <Button
          variant={"contained"}
          type={"submit"}
          disabled={!calculated}
          onClick={addProductsToCart}
        >
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
}
