"use strict";

function getYclidFromLifecycleEvent(event) {
  // Мы ожидаем, что клиент (Next server action) прокинул yclid в тело create запроса.
  const yclid =
    event &&
    event.params &&
    event.params.data &&
    (event.params.data.yclid || event.params.data.yandexClickId);

  if (typeof yclid === "string" || typeof yclid === "number") {
    const normalized = String(yclid).trim();
    return normalized ? normalized : null;
  }

  return null;
}

module.exports = {
  getYclidFromLifecycleEvent,
};
