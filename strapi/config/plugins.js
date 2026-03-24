module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: `smtp.${env("MAIL_CLIENT")}.ru`,
        port: 465,
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: env("MAIL_LOGIN"),
          pass: env("MAIL_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: "info@fliben.ru",
      },
    },
  },
});
