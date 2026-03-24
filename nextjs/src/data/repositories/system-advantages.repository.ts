import { action } from "@/data/actions/actions";
import { AppResponse } from "@/types/app-response";
import { SystemAdvantagesType } from "@/types/dto/system-advantages/system-advantages.type";

const textRevalidate = 0;

export const systemAdvantagesRepository = {
  getSystemAdvantagesContent: (): Promise<AppResponse<SystemAdvantagesType>> =>
    action().get("system-advantages", textRevalidate),
};
