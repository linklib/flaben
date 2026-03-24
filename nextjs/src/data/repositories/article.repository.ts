import { action } from "@/data/actions/actions";
import qs from "qs";
import { AppResponse } from "@/types/app-response";
import { ArticleType } from "@/types/dto/article/article.type";

const segment = "articles";

const query = (category?: string) =>
  qs.stringify(
    {
      filters: { category: { slug: { $eq: category } } },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    },
  );

export const articleRepository = {
  findAll: (category?: string): Promise<AppResponse<ArticleType[]>> =>
    action().get(`${segment}?` + query(category)),
  findOne: (id?: string): Promise<AppResponse<ArticleType>> =>
    action().get(`${segment}/${id}?` + query()),
};
