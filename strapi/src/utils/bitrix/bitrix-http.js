"use strict";

const https = require("https");

function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

function getRequiredEnvironmentVariable(variableName) {
  const value = process.env[variableName];
  if (!value || typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
  return value.trim();
}

function safeParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

/**
 * Не логируем потенциально чувствительные поля (UF_*, COMMENTS).
 * В логе оставляем только “безопасный минимум”.
 */
function sanitizeBitrixFieldsForLog(fields) {
  if (!fields || typeof fields !== "object") {
    return {};
  }

  const sanitized = {};

  if (typeof fields.TITLE === "string") {
    sanitized.TITLE = fields.TITLE;
  }

  if (typeof fields.CONTACT_ID === "number") {
    sanitized.CONTACT_ID = fields.CONTACT_ID;
  }

  // если очень надо видеть, что UF_CRM_* заполнялись — логируй только имена, без значений
  const customFieldNames = Object.keys(fields).filter((key) =>
    key.startsWith("UF_CRM_"),
  );
  if (customFieldNames.length > 0) {
    sanitized.UF_CRM_FIELDS = customFieldNames;
  }

  return sanitized;
}

function httpsPostJson(urlString, jsonBodyObject, timeoutMilliseconds) {
  return new Promise((resolve, reject) => {
    const urlObject = new URL(urlString);
    const requestBodyString = JSON.stringify(jsonBodyObject);

    const requestOptions = {
      method: "POST",
      protocol: urlObject.protocol,
      hostname: urlObject.hostname,
      port: urlObject.port || 443,
      path: `${urlObject.pathname}${urlObject.search}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(requestBodyString),
      },
    };

    const request = https.request(requestOptions, (response) => {
      let responseBody = "";

      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        resolve({
          statusCode: response.statusCode || 0,
          bodyText: responseBody,
        });
      });
    });

    request.on("error", (error) => reject(error));

    request.setTimeout(timeoutMilliseconds, () => {
      request.destroy(
        new Error(`Request timeout after ${timeoutMilliseconds}ms`),
      );
    });

    request.write(requestBodyString);
    request.end();
  });
}

/**
 * Создаёт сделку в Bitrix и логирует:
 * - старт (коротко)
 * - успех (dealId + длительность + http status)
 * - ошибку (http status + error + небольшой срез ответа)
 *
 * Важно: не логируем секреты/полный payload.
 */
async function bitrixDealAdd(fields, timeoutMilliseconds = 5000) {
  const bitrixWebhookBaseUrl = ensureTrailingSlash(
    getRequiredEnvironmentVariable("BITRIX24_WEBHOOK_URL"),
  );

  const bitrixEndpointUrl = `${bitrixWebhookBaseUrl}crm.deal.add.json`;

  const payload = { fields };

  const startTime = Date.now();

  // Старт
  try {
    strapi.log.info(
      `[bitrix] deal.add -> start url=${bitrixEndpointUrl} fields=${safeStringify(
        sanitizeBitrixFieldsForLog(fields),
      )}`,
    );
  } catch {
    // если вдруг strapi не доступен (теоретически) — игнор
  }

  const response = await httpsPostJson(
    bitrixEndpointUrl,
    payload,
    timeoutMilliseconds,
  );

  const durationMilliseconds = Date.now() - startTime;
  const responseJson = safeParseJson(response.bodyText);

  const isHttpOk = response.statusCode >= 200 && response.statusCode < 300;
  const isBitrixOk = responseJson && !responseJson.error;

  if (!isHttpOk || !isBitrixOk) {
    // Ошибка (лог)
    const bitrixErrorCode =
      responseJson && responseJson.error ? responseJson.error : null;
    const bitrixErrorDescription =
      responseJson && responseJson.error_description
        ? responseJson.error_description
        : null;

    // Ограничим длину тела, чтобы не засорять логи
    const rawBodyPreview =
      typeof response.bodyText === "string"
        ? response.bodyText.slice(0, 1500)
        : String(response.bodyText).slice(0, 1500);

    strapi.log.error(
      `[bitrix] deal.add -> failed status=${response.statusCode} durationMs=${durationMilliseconds}` +
        (bitrixErrorCode ? ` error=${bitrixErrorCode}` : "") +
        (bitrixErrorDescription
          ? ` description=${bitrixErrorDescription}`
          : "") +
        ` responsePreview=${rawBodyPreview}`,
    );

    const error = new Error("Bitrix24 request failed");
    error.bitrix = responseJson ?? { raw: response.bodyText };
    error.statusCode = response.statusCode;
    error.durationMilliseconds = durationMilliseconds;
    throw error;
  }

  // Успех
  const dealId = responseJson.result;

  strapi.log.info(
    `[bitrix] deal.add -> success dealId=${dealId} status=${response.statusCode} durationMs=${durationMilliseconds}`,
  );

  return {
    dealId,
    raw: responseJson,
    statusCode: response.statusCode,
    durationMilliseconds,
  };
}

async function bitrixContactList(filter, select, timeoutMilliseconds = 5000) {
  const bitrixWebhookBaseUrl = ensureTrailingSlash(
    getRequiredEnvironmentVariable("BITRIX24_WEBHOOK_URL"),
  );
  const bitrixEndpointUrl = `${bitrixWebhookBaseUrl}crm.contact.list.json`;
  const payload = { filter, select };

  const response = await httpsPostJson(
    bitrixEndpointUrl,
    payload,
    timeoutMilliseconds,
  );
  const responseJson = safeParseJson(response.bodyText);

  const isHttpOk = response.statusCode >= 200 && response.statusCode < 300;
  const isBitrixOk = responseJson && !responseJson.error;

  if (!isHttpOk || !isBitrixOk) {
    const error = new Error("Bitrix24 contact.list request failed");
    error.bitrix = responseJson ?? { raw: response.bodyText };
    error.statusCode = response.statusCode;
    throw error;
  }

  return Array.isArray(responseJson.result) ? responseJson.result : [];
}

async function bitrixContactAdd(fields, timeoutMilliseconds = 5000) {
  const bitrixWebhookBaseUrl = ensureTrailingSlash(
    getRequiredEnvironmentVariable("BITRIX24_WEBHOOK_URL"),
  );
  const bitrixEndpointUrl = `${bitrixWebhookBaseUrl}crm.contact.add.json`;
  const payload = { fields };

  const response = await httpsPostJson(
    bitrixEndpointUrl,
    payload,
    timeoutMilliseconds,
  );
  const responseJson = safeParseJson(response.bodyText);

  const isHttpOk = response.statusCode >= 200 && response.statusCode < 300;
  const isBitrixOk = responseJson && !responseJson.error;

  if (!isHttpOk || !isBitrixOk) {
    const error = new Error("Bitrix24 contact.add request failed");
    error.bitrix = responseJson ?? { raw: response.bodyText };
    error.statusCode = response.statusCode;
    throw error;
  }

  return responseJson.result;
}

module.exports = {
  bitrixContactAdd,
  bitrixContactList,
  bitrixDealAdd,
  getRequiredEnvironmentVariable,
};
