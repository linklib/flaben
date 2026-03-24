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
      `<p><strong>Заявка с сайта FLIBEN</strong></p>` +
      `<p>Телефон: <strong><a href="tel:${phone}">${phone}</a></strong></p>` +
      `<p>Почта: <strong>${email ?? "Не указано"}</strong></p>` +
      `<p>Имя: <strong>${name ?? "Не указано"}</strong></p>` +
      `<p>Текст заявки: <strong>${comment ?? "Не указано"}</strong></p>`;

    const yclid = getYclidFromLifecycleEvent(event);

    const emailPromise = strapi.plugins["email"].services.email.send({
      to: process.env.MAIL_TO,
      subject: "Заявка с сайта Fliben.ru",
      html: emailHtml,
    });

    const bitrixPromise = sendYandexGoalToBitrix({
      goalCode: yandexGoalsMap.REQUEST,
      phone,
      yandexClickId: yclid,
      dealTitle: "Заявка — с сайта",
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
        `[request] email send failed: ${String(emailResult.reason)}`,
      );
    }

    if (bitrixResult.status === "rejected") {
      strapi.log.error(
        `[request] bitrix send failed: ${String(bitrixResult.reason)}`,
      );
    } else {
      strapi.log.info(`[request] bitrix dealId=${bitrixResult.value.dealId}`);
    }
  },
};
