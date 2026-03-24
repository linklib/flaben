import { StrapiResponseType } from "@/types/strapi-response.type";
import { AppResponse } from "@/types/app-response";

const apiHost = process.env.apiHost;

async function jsonResponse(response: Response) {
  try {
    const strapiResponse: StrapiResponseType<any> = await response.json();
    return {
      data: strapiResponse,
      statusCode: response.status,
    } as AppResponse<any>;
  } catch (e) {
    return {
      data: null,
      statusCode: response.status,
      errorMessage: `Не удалось обработать ответ сервера`,
    } as AppResponse<any>;
  }
}

async function checkResponse(response: Response) {
  if (response.ok) {
    return jsonResponse(response);
  } else {
    return {
      data: null,
      statusCode: response.status,
      errorMessage: response.statusText,
    } as AppResponse<any>;
  }
}

async function getServerAction(url?: string, revalidate?: number) {
  try {
    return await checkResponse(
      await fetch(`${apiHost}/${url}`, {
        cache: revalidate ? undefined : "no-store",
      }),
    );
  } catch (e) {
    return {
      data: null,
      statusCode: 500,
      errorMessage: `Не отправить запрос`,
    } as AppResponse<any>;
  }
}

async function postServerAction(data: {}, url?: string) {
  try {
    return await checkResponse(
      await fetch(`${apiHost}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
        cache: "no-store",
      }),
    );
  } catch (e) {
    return {
      data: null,
      statusCode: 500,
      errorMessage: `Не отправить запрос`,
    } as AppResponse<any>;
  }
}

export function action() {
  return {
    get: (url?: string, revalidate?: number) =>
      getServerAction(url, revalidate),
    post: (data: {}, url?: string) => postServerAction(data, url),
  };
}
