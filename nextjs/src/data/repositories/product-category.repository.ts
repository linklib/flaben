import { action } from "@/data/actions/actions";
import { ProductCategoryType } from "@/types/dto/product-category/product-category.type";
import qs from "qs";
import { AppResponse } from "@/types/app-response";

const segment = "product-categories";

const query = () =>
  qs.stringify(
    {
      sort: ["order:asc"],
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    },
  );

export const productCategoryRepository = {
  findAll: (): Promise<AppResponse<ProductCategoryType[]>> =>
    action().get(`${segment}?${query()}`),
  findOne: (id?: string): Promise<AppResponse<ProductCategoryType>> =>
    action().get(`${segment}/${id}?${query()}`),
};
