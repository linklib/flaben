import { action } from "@/data/actions/actions";
import { AppAction } from "@/types/actions/app-action";
import { AdvantageType } from "@/types/dto/advantage/advantage.type";
import qs from "qs";

const segment = "partnership-advantages";

const query = qs.stringify(
  {
    sort: ["order:asc"],
    populate: "*",
  },
  {
    encodeValuesOnly: true,
  },
);

export const advantageRepository: Record<string, AppAction<AdvantageType[]>> = {
  findAll: () => action().get(`${segment}?${query}`),
};
