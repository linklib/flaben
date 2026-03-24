import { action } from "@/data/actions/actions";
import { AppAction } from "@/types/actions/app-action";
import { GeneralImageType } from "@/types/dto/general-image/general-image.type";

const segment = "general-image";

export const generalImageRepository: Record<
  string,
  AppAction<GeneralImageType>
> = {
  find: () => action().get(`${segment}?populate=*`),
};
