import css from "./page.module.scss";
import * as React from "react";
import AnimatedContainer from "@/app/components/animated-container/animated-container";
import { productsRepository } from "@/data/repositories/products.repository";
import ProductCard from "@/app/components/product-card/product-card";

type Props = {
  params: { category: string };
};

export default async function Page(props: Readonly<Props>) {
  const params = props.params;

  const productsResponse = await productsRepository.findAll(undefined, {
    category: params.category === "all" ? undefined : params.category,
  });

  return (
    productsResponse.data?.data && (
      <AnimatedContainer id={"products"} className={css.products__wrapper}>
        {
          productsResponse.data.data.map((product, index) => (
            <ProductCard
              key={`${product.attributes.name}_${index}`}
              product={product}
            />
          )) as []
        }
      </AnimatedContainer>
    )
  );
}
