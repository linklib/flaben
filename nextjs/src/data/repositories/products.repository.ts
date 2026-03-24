import { action } from "@/data/actions/actions";
import qs from "qs";
import { AppResponse } from "@/types/app-response";
import { ProductType } from "@/types/dto/product/product.type";

const segment = "products";

const query = (
  ids?: number[],
  searchParams?: {
    category?: string;
    sku?: string;
    name?: string;
  },
) =>
  qs.stringify(
    {
      filters: {
        category: { slug: { $eq: searchParams?.category } },
        id: {
          $in: ids,
        },
        $or: [
          { sku: { $containsi: searchParams?.sku } },
          { name: { $containsi: searchParams?.name } },
        ],
      },
      sort: ["order:asc"],
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    },
  );

const productQuery = () =>
  qs.stringify(
    {
      populate: {
        category: { populate: "*" },
        values: { populate: ["param"] },
        image: { populate: "*" },
        images: { populate: "*" },
      },
      sort: ["order:asc"],
    },
    {
      encodeValuesOnly: true,
    },
  );

export const productsRepository = {
  findAll: (
    ids?: number[],
    searchParams?: {
      category?: string;
      sku?: string;
      name?: string;
    },
  ): Promise<AppResponse<ProductType[]>> =>
    action().get(`${segment}?` + query(ids, searchParams)),
  findOne: (id?: string): Promise<AppResponse<ProductType>> =>
    action().get(`${segment}/${id}?` + productQuery()),
};
