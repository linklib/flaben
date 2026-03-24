"use strict";

const {
  sendYandexGoalToBitrix,
} = require("../../../../utils/bitrix/yandex-goal-sender");
const {
  getYclidFromLifecycleEvent,
} = require("../../../../utils/strapi/lifecycle-getters");
const { yandexGoalsMap } = require("../../../../utils/bitrix/goals");

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const {
      name,
      middleName,
      phone,
      email,
      city,
      street,
      flat,
      building,
      isCashPayment,
    } = result;

    const products = await strapi.db.query("api::product.product").findMany({
      where: {
        id: {
          $in:
            event?.params?.data?.cartProducts?.flatMap(
              (cartProduct) => cartProduct.id,
            ) ?? [],
        },
      },
      populate: {
        product: { image: true },
      },
    });

    const cartProducts = products.map((product) => {
      return {
        ...product,
        amount: event?.params?.data?.cartProducts?.find(
          (cartProduct) => cartProduct.id === product.id,
        )?.amount,
      };
    });

    const productBlocks = cartProducts
      ?.map((product, index) => {
        return `<p><strong>${index + 1}.</strong> Товар - <strong><a href="http://fliben.ru/marketplace/${product.id}">${product.name}</a></strong> количество - ${product.amount} шт.</p>`;
      })
      .join("");

    const totalPrice =
      cartProducts?.length > 0
        ? cartProducts
            ?.flatMap((cartProduct) => cartProduct.amount * cartProduct.price)
            ?.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
            )
        : 0;

    const emailHtml =
      `<p><strong>Заявка с сайта FLIBEN</strong></p>` +
      `<p>Телефон: <strong><a href="tel:${phone}">${phone}</a></strong></p>` +
      `<p>Почта: <strong>${email ?? "Не указано"}</strong></p>` +
      `<p>Имя: <strong>${name ?? "Не указано"}</strong></p>` +
      `<p>Фамилия: <strong>${middleName ?? "Не указано"}</strong></p>` +
      `<p>Город: <strong>${city ?? "Не указано"}</strong></p>` +
      `<p>Улица: <strong>${street ?? "Не указано"}</strong></p>` +
      `<p>Квартира: <strong>${flat ?? "Не указано"}</strong></p>` +
      `<p>Строение: <strong>${building ?? "Не указано"}</strong></p>` +
      `<p>Оплата наличными: <strong>${isCashPayment === true ? "Да" : "Не указано"}</strong></p>` +
      `<p><strong>Товары в корзине: </strong></p>` +
      productBlocks +
      `<p>Общая стоимость товаров: <strong>${totalPrice?.toLocaleString("ru")} ₽</strong></p>`;

    const yclid = getYclidFromLifecycleEvent(event);

    const emailPromise = strapi.plugins["email"].services.email.send({
      to: process.env.MAIL_TO,
      subject: "Заявка с сайта Fliben.ru",
      html: emailHtml,
    });

    const bitrixPromise = sendYandexGoalToBitrix({
      goalCode: yandexGoalsMap.CART,
      phone,
      yandexClickId: yclid,
      dealTitle: "Корзина — заявка с сайта",
      dealComment:
        `Телефон: ${phone || "-"}\n` +
        `Email: ${email || "-"}\n` +
        `Город: ${city || "-"}\n` +
        `Сумма: ${totalPrice || 0}\n`,
    });

    const [emailResult, bitrixResult] = await Promise.allSettled([
      emailPromise,
      bitrixPromise,
    ]);

    if (emailResult.status === "rejected") {
      strapi.log.error(
        `[cart-request] email send failed: ${String(emailResult.reason)}`,
      );
    }

    if (bitrixResult.status === "rejected") {
      strapi.log.error(
        `[cart-request] bitrix send failed: ${String(bitrixResult.reason)}`,
      );
    } else {
      strapi.log.info(
        `[cart-request] bitrix dealId=${bitrixResult.value.dealId}`,
      );
    }
  },
};
