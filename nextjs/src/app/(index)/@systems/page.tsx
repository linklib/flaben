import Systems from "@/app/components/systems/systems";
import { productCategoryRepository } from "@/data/repositories/product-category.repository";

export default async function Page() {
  const categoryResponse = await productCategoryRepository.findAll();
  return <Systems productCategories={categoryResponse.data?.data} />;
}
