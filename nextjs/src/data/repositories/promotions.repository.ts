import { action } from "@/data/actions/actions";
import { AppAction } from "@/types/actions/app-action";
import qs from "qs";
import { PromotionType } from "@/types/dto/promotion/promotion.type";

const segment = "promotions";

const query = qs.stringify(
  {
    populate: "*",
  },
  {
    encodeValuesOnly: true,
  },
);

export const promotionsRepository: Record<
  string,
  AppAction<PromotionType[]>
> = {
  findAll: () => action().get(`${segment}?${query}`),
};
