"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { cartStorage } from "@/utils/features/cart-storage";
import MinusIcon from "@/app/components/icons/minus.icon";
import PlusIcon from "@/app/components/icons/plus.icon";
import { storageEventName } from "@/utils/constants/constants";

type Props = {
  productId: number;
  staticCount?: number;
  text?: string;
  disabled?: boolean;
};

export default function ProductCartButton(props: Props) {
  const [cartProductAmount, setCartProductAmount] = useState(
    undefined as number | undefined,
  );

  useEffect(() => {
    const cartProduct = cartStorage.getProduct(props.productId);
    if (cartProduct) {
      setCartProductAmount(cartProduct.amount);
    }

    const getCartProductAmount = () => {
      if (!props.staticCount)
        setCartProductAmount(cartStorage.getProduct(props.productId)?.amount);
    };

    window.addEventListener(storageEventName, getCartProductAmount);
    return () =>
      window.removeEventListener(storageEventName, getCartProductAmount);
  }, [props.productId, props.text]);

  return cartProductAmount || props.staticCount ? (
    <Button
      variant={"outlined"}
      startIcon={
        <MinusIcon
          onClick={() =>
            !props.disabled && cartStorage.removeProduct(props.productId)
          }
        />
      }
      endIcon={
        <PlusIcon
          onClick={() =>
            !props.disabled && cartStorage.addProduct(props.productId)
          }
        />
      }
      fullWidth
      disabled={props.disabled}
      style={{ justifyContent: "space-between" }}
    >
      {props.staticCount ? props.staticCount : cartProductAmount}
    </Button>
  ) : (
    <Button
      variant={"contained"}
      onClick={() => cartStorage.addProduct(props.productId)}
    >
      {props.text ?? "В корзину"}
    </Button>
  );
}
