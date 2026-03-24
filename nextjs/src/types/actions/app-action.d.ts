import { AppResponse } from "@/types/app-response";

export type AppAction<T> = ([...args]?: string) => Promise<AppResponse<T>>;

export type AppFormAction<T> = (
  state: AppResponse<T>,
  payload: FormData,
) => Promise<AppResponse<T>>;
