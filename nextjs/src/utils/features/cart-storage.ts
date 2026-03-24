import {
  storageCartKey,
  storageCartProductsAmountKey,
  storageCartProductsIdKey,
} from "@/utils/constants/constants";
import { Cart } from "@/types/cart";
import { storage } from "@/utils/features/storage";

export const cartStorage = {
  getOrCreateCart() {
    try {
      const value = localStorage.getItem("cart");
      if (value) return JSON.parse(value) as Cart;
      storage.set(storageCartKey, { products: [] });
      return { products: [] } as Cart;
    } catch (e) {
      return { products: [] } as Cart;
    }
  },
  getProduct(productId: number) {
    const cart = this.getOrCreateCart();
    return cart.products.find(
      (product) => product[storageCartProductsIdKey] === productId,
    );
  },
  addProduct(productId: number) {
    const cart = this.getOrCreateCart();
    const productInCart = cart.products.find(
      (product) => product[storageCartProductsIdKey] === productId,
    );
    if (productInCart) {
      productInCart[storageCartProductsAmountKey] += 1;
    } else {
      cart.products.push({ amount: 1, id: productId });
    }
    storage.set(storageCartKey, cart);
  },
  addProducts(products: { amount: number; id: number }[]) {
    const cart = this.getOrCreateCart();
    products.forEach((product) => {
      const productInCart = cart.products.find(
        (cartProduct) => cartProduct[storageCartProductsIdKey] === product.id,
      );
      if (productInCart) {
        productInCart[storageCartProductsAmountKey] += product.amount;
      } else {
        cart.products.push({ amount: product.amount, id: product.id });
      }
    });
    storage.set(storageCartKey, cart);
  },
  removeProduct(productId: number) {
    const cart = this.getOrCreateCart();
    const productInCart = cart.products.find(
      (product) => product[storageCartProductsIdKey] === productId,
    );

    if (productInCart) {
      if (productInCart[storageCartProductsAmountKey] === 1) {
        cart.products = cart.products.filter(
          (product) => product[storageCartProductsIdKey] !== productId,
        );
      } else {
        productInCart[storageCartProductsAmountKey] -= 1;
      }
      storage.set(storageCartKey, cart);
    }
  },

  emptyCart() {
    const cart = this.getOrCreateCart();
    cart.products = [];
    storage.set(storageCartKey, cart);
  },
};
