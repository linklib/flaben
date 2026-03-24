import { StrapiResponseType } from "@/types/strapi-response.type";

export interface AppResponse<T> {
  data: StrapiResponseType<T> | null;
  statusCode?: number;
  errorMessage?: string;
}
