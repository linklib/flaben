module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: "http://89.111.141.25/fliben-strapi",

  url:
    env("NODE_ENV") === "production"
      ? "https://fliben.ru/fliben-strapi"
      : undefined,
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
