import { action } from "@/data/actions/actions";
import { AppResponse } from "@/types/app-response";
import { RequestType } from "@/types/request.type";
import { withYclid } from "@/data/actions/with-yclid";

const segment = "requests";

export const requestsRepository = {
  create: async (
    state: AppResponse<RequestType>,
    formData: FormData,
  ): Promise<AppResponse<RequestType>> => {
    const dataFromForm = Object.fromEntries(formData) as Record<
      string,
      unknown
    >;
    const dataWithYclid = await withYclid(dataFromForm);

    return action().post(dataWithYclid, `${segment}`);
  },
};
