import { ProductType } from "@/types/dto/product/product.type";

export type Cart = {
  products: { amount: number; id: number; product?: ProductType }[];
};
