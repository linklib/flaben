"use strict";

const {
  sendYandexGoalToBitrix,
} = require("../../../utils/bitrix/yandex-goal-sender");

module.exports = {
  async track(ctx) {
    try {
      const requestBodyData =
        ctx.request.body && ctx.request.body.data ? ctx.request.body.data : {};

      const goalCode = requestBodyData.goalCode;
      const clientId = requestBodyData.clientId;

      const result = await sendYandexGoalToBitrix({ goalCode, clientId });

      strapi.log.info(
        `[yandex-goal-events] success goalCode=${String(goalCode)} dealId=${result.dealId}`,
      );

      ctx.status = 200;
      ctx.body = {
        ok: true,
        dealId: result.dealId,
        received: {
          goalCode,
          clientId,
          contactIdWasUsed: result.contactIdWasUsed,
        },
      };
    } catch (error) {
      const statusCode =
        error && error.statusCode ? Number(error.statusCode) : 500;

      if (statusCode >= 500) {
        strapi.log.error(`[yandex-goal-events] error: ${String(error)}`);
      } else {
        strapi.log.warn(`[yandex-goal-events] error: ${String(error)}`);
      }

      ctx.status = statusCode === 400 ? 400 : 500;
      ctx.body = {
        ok: false,
        message:
          statusCode === 400
            ? "Некорректные данные"
            : "Unexpected server error",
        bitrix: error && error.bitrix ? error.bitrix : undefined,
      };
    }
  },
};
