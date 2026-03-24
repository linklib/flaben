"use strict";

const { yandexGoalsMap } = require("../../../../utils/bitrix/goals");
const {
  sendYandexGoalToBitrix,
} = require("../../../../utils/bitrix/yandex-goal-sender");
const {
  getYclidFromLifecycleEvent,
} = require("../../../../utils/strapi/lifecycle-getters");

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const { phone, email, comment, name } = result;

    const emailHtml =
      `<p><strong>Заявка на партнерство с сайта FLIBEN</strong></p>` +
      `<p>Телефон: <strong><a href="tel:${phone}">${phone}</a></strong></p>` +
      `<p>Почта: <strong>${email ?? "Не указано"}</strong></p>` +
      `<p>Имя: <strong>${name ?? "Не указано"}</strong></p>` +
      `<p>Текст заявки: <strong>${comment ?? "Не указано"}</strong></p>`;

    const yclid = getYclidFromLifecycleEvent(event);

    const emailPromise = strapi.plugins["email"].services.email.send({
      to: process.env.MAIL_TO,
      subject: "Заявка на партнерство с сайта Fliben.ru",
      html: emailHtml,
    });

    const bitrixPromise = sendYandexGoalToBitrix({
      goalCode: yandexGoalsMap.PARTNERSHIP,
      phone,
      yandexClickId: yclid,
      dealTitle: "Партнёрство — заявка с сайта",
      dealComment:
        `Телефон: ${phone || "-"}\n` +
        `Email: ${email || "-"}\n` +
        `Имя: ${name || "-"}\n` +
        `Комментарий: ${comment || "-"}\n`,
    });

    const [emailResult, bitrixResult] = await Promise.allSettled([
      emailPromise,
      bitrixPromise,
    ]);

    if (emailResult.status === "rejected") {
      strapi.log.error(
        `[partnership-request] email send failed: ${String(emailResult.reason)}`,
      );
    }

    if (bitrixResult.status === "rejected") {
      strapi.log.error(
        `[partnership-request] bitrix send failed: ${String(bitrixResult.reason)}`,
      );
    } else {
      strapi.log.info(
        `[partnership-request] bitrix dealId=${bitrixResult.value.dealId}`,
      );
    }
  },
};
