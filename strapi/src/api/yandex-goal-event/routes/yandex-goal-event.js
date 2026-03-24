"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/yandex-goal-events/track",
      handler: "yandex-goal-event.track",
      config: {
        auth: false,
      },
    },
  ],
};
