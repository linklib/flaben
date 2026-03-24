"use strict";

const { bitrixContactAdd, bitrixContactList, bitrixDealAdd } = require("./bitrix-http");

function normalizeString(value) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value).trim();
  return "";
}

function normalizePhoneDigits(value) {
  return normalizeString(value).replace(/\D/g, "");
}

/**
 * Универсальная отправка "события" в Bitrix (создание сделки).
 * goalCode — код цели
 * phone — номер телефона клиента
 * yandexClickId/clientId — id клика Яндекса (опционально)
 */
async function sendYandexGoalToBitrix(args) {
  const goalCode = normalizeString(args.goalCode);
  const phone = normalizeString(args.phone);
  const phoneDigits = normalizePhoneDigits(phone);
  const yandexClickId = normalizeString(args.yandexClickId || args.clientId);
  const dealTitle = normalizeString(args.dealTitle) || "СДЕЛКА ПО САЙТУ";
  const dealComment = normalizeString(args.dealComment);

  if (!goalCode) {
    const error = new Error("goalCode is required");
    error.statusCode = 400;
    throw error;
  }

  if (!phone) {
    const error = new Error("phone is required");
    error.statusCode = 400;
    throw error;
  }

  let existingContacts = await bitrixContactList({ PHONE: phone }, ["ID"], 5000);

  if (existingContacts.length === 0 && phoneDigits && phoneDigits !== phone) {
    existingContacts = await bitrixContactList({ PHONE: phoneDigits }, ["ID"], 5000);
  }

  const existingContactId = Number(
    existingContacts[0] && existingContacts[0].ID ? existingContacts[0].ID : 0,
  );
  const contactExists = Number.isFinite(existingContactId) && existingContactId > 0;

  const contactId =
    contactExists
      ? existingContactId
      : Number(
          await bitrixContactAdd(
            {
              NAME: `Клиент ${phone}`,
              PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
              ...(yandexClickId ? { UF_CRM_1768900985290: yandexClickId } : {}),
            },
            5000,
          ),
        );

  if (!Number.isFinite(contactId) || contactId <= 0) {
    const error = new Error("Unable to resolve Bitrix CONTACT_ID");
    error.statusCode = 500;
    throw error;
  }

  const fields = {
    TITLE: dealTitle,
    CONTACT_ID: contactId,
    UF_CRM_1759480162840: goalCode,
    ...(yandexClickId ? { UF_CRM_1768900985290: yandexClickId } : {}),
    ...(dealComment ? { COMMENTS: dealComment } : {}),
  };

  const result = await bitrixDealAdd(fields, 5000);

  return {
    dealId: result.dealId,
    contactIdWasUsed: true,
    contactWasCreated: !contactExists,
    contactId,
  };
}

module.exports = {
  sendYandexGoalToBitrix,
};
