import css from "./page.module.scss";
import { productsRepository } from "@/data/repositories/products.repository";
import { notFound } from "next/navigation";
import AppContainer from "@/app/components/app-container/app-container";
import AppPaper from "@/app/components/app-papper/app-paper";
import ProductCard from "@/app/components/product-card/product-card";

type Props = { params: { id: string } };
export default async function Page(props: Props) {
  const productResponse = await productsRepository.findOne(props.params.id);
  if (!productResponse.data) {
    notFound();
  }

  const productsCategoryProductsResponse = await productsRepository.findAll(
    undefined,
    {
      category:
        productResponse.data.data.attributes.category.data.attributes.slug,
    },
  );

  const productsCategoryProducts =
    productsCategoryProductsResponse.data?.data.filter(
      (product) => product.id != productResponse.data?.data.id,
    );

  return (
    productsCategoryProducts &&
    productsCategoryProducts.length > 0 && (
      <AppContainer>
        <AppPaper className={css.container}>
          <h2>Сопутствующие товары</h2>
          <div className={css.grid}>
            {productsCategoryProducts.map((product) => (
              <ProductCard
                key={`additional_product_${product.attributes.name}`}
                product={product}
              />
            ))}
          </div>
        </AppPaper>
      </AppContainer>
    )
  );
}
