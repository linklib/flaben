import { useEffect, useState } from "react";
import { cartStorage } from "@/utils/features/cart-storage";
import { storageEventName } from "@/utils/constants/constants";
import { Cart } from "@/types/cart";
import { productsRepository } from "@/data/repositories/products.repository";
import { ProductType } from "@/types/dto/product/product.type";

export const useCartValues = () => {
  const [amount, setAmount] = useState(undefined as number | undefined);
  const [price, setPrice] = useState(undefined as number | undefined);
  const [isPending, setIsPending] = useState(true);
  const [products, setProducts] = useState(
    undefined as ProductType[] | undefined,
  );

  useEffect(() => {
    if (!isPending) window.scroll({ top: 0 });

    const getCarProductsAmount = (cart: Cart) =>
      cart?.products
        .flatMap((product) => product.amount)
        .reduce((previousValue, currentValue) => previousValue + currentValue);

    const getCarProductsIds = (cart: Cart) =>
      cart.products.flatMap((product) => product.id);

    const getCartProductsTotalPrice = (cart: Cart) =>
      cart.products
        .flatMap(
          (product) =>
            product.amount *
            (products?.find(
              (backendProduct) => product.id === backendProduct.id,
            )?.attributes.price ?? 0),
        )
        .reduce((previousValue, currentValue) => previousValue + currentValue);

    const getInitCartProductsTotalPrice = (
      cart: Cart,
      products: ProductType[],
    ) =>
      cart.products
        .flatMap(
          (product) =>
            product.amount *
            (products?.find(
              (backendProduct) => product.id === backendProduct.id,
            )?.attributes.price ?? 0),
        )
        .reduce((previousValue, currentValue) => previousValue + currentValue);

    const setLocalValues = (cart: Cart) => {
      if (cart.products.length > 0) {
        setProducts(
          products?.filter((product) =>
            cart.products
              .flatMap((cartProduct) => cartProduct.id)
              .includes(product.id),
          ),
        );
        setAmount(getCarProductsAmount(cart));
        setPrice(getCartProductsTotalPrice(cart));
      } else {
        setProducts(undefined);
      }
    };

    const getCartProducts = async () => {
      const cart = cartStorage.getOrCreateCart();

      if (cart.products.length > 0) {
        const cartProducts = await productsRepository.findAll(
          getCarProductsIds(cart),
        );
        setProducts(cartProducts.data?.data);
        if (cartProducts.data && cart.products.length > 0) {
          setAmount(getCarProductsAmount(cart));
          setPrice(getInitCartProductsTotalPrice(cart, cartProducts.data.data));
        }
      }
      setIsPending(false);
    };

    const cartProductsEventHandler = () => {
      const cart = cartStorage.getOrCreateCart();
      setLocalValues(cart);
    };

    if (isPending) getCartProducts();

    window.addEventListener(storageEventName, cartProductsEventHandler);
    return () =>
      window.removeEventListener(storageEventName, cartProductsEventHandler);
  }, [isPending, products]);

  return {
    amount,
    price,
    products,
    isPending,
  };
};
