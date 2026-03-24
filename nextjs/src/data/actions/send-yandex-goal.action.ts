"use server";

import { cookies } from "next/headers";
import { AppResponse } from "@/types/app-response";
import { StrapiResponseType } from "@/types/strapi-response.type";

type YandexGoalEventPayload = {
  goalCode: string;
  clientId?: string | null;
};

const apiHost = process.env.apiHost;

function buildAppResponseFromJson(
  responseStatusCode: number,
  json: unknown,
): AppResponse<any> {
  return {
    data: json as StrapiResponseType<any>,
    statusCode: responseStatusCode,
  } as AppResponse<any>;
}

async function safeJsonResponse(response: Response): Promise<AppResponse<any>> {
  try {
    const json = await response.json();
    return buildAppResponseFromJson(response.status, json);
  } catch {
    return {
      data: null,
      statusCode: response.status,
      errorMessage: "Не удалось обработать ответ сервера",
    } as AppResponse<any>;
  }
}

async function safeCheckResponse(
  response: Response,
): Promise<AppResponse<any>> {
  if (response.ok) {
    return safeJsonResponse(response);
  }

  return {
    data: null,
    statusCode: response.status,
    errorMessage: response.statusText || "Ошибка запроса",
  } as AppResponse<any>;
}

function getRequiredEnvironmentVariable(variableName: string): string {
  const value = process.env[variableName];
  if (!value) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
  return value;
}

export async function sendYandexGoalAction(
  goalCode: string,
): Promise<AppResponse<any>> {
  try {
    const resolvedApiHost = apiHost;

    const cookieStore = cookies();

    const payload: YandexGoalEventPayload = {
      goalCode,
      clientId: cookieStore.get("yclid")?.value,
    };

    const url = `${resolvedApiHost}/yandex-goal-events/track`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: payload }),
      cache: "no-store",
    });

    return await safeCheckResponse(response);
  } catch (error) {
    return {
      data: null,
      statusCode: 500,
      errorMessage: `Не отправить запрос: ${String(error)}`,
    } as AppResponse<any>;
  }
}
