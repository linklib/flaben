import { action } from "@/data/actions/actions";
import { AppResponse } from "@/types/app-response";
import { RequestType } from "@/types/request.type";
import { Cart } from "@/types/cart";
import { withYclid } from "@/data/actions/with-yclid";

const segment = "cart-requests";

export const cartRequestsRepository = {
  create: async (
    cart: Cart,
    state: AppResponse<RequestType>,
    formData: FormData,
  ): Promise<AppResponse<RequestType>> => {
    const dataFromForm = Object.fromEntries(formData) as Record<
      string,
      unknown
    >;

    const data: Record<string, unknown> = {
      ...dataFromForm,
      cartProducts: cart.products,
    };

    const dataWithYclid = await withYclid(data);

    return action().post(dataWithYclid, `${segment}`);
  },
};
