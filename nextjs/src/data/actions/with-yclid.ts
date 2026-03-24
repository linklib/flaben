"use server";

import { cookies } from "next/headers";

export async function withYclid<TData extends Record<string, unknown>>(
  data: TData,
) {
  const yandexClickId = cookies().get("yclid")?.value;

  if (!yandexClickId) {
    return data;
  }

  return {
    ...data,
    yclid: yandexClickId,
  };
}
