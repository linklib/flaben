export type SiteLink = {
  title: string;
  link: (...args: string[]) => string;
  segment: string;
};

export const siteLinks: Record<string, SiteLink> = {
  root: { title: "Главная", link: () => "/", segment: "(index)" },
  menu: { title: "Меню", link: () => "/menu", segment: "menu" },
  video: {
    title: "Инструкция по сборке",
    link: (category) => `/video/${category}`,
    segment: "video",
  },
  request: {
    title: "Заявка на партнерство",
    link: () => "/partnership-request",
    segment: "partnership-request",
  },
  requestSuccess: {
    title: "Заявка успешно отправлена",
    link: () => "/partnership-request/success",
    segment: "partnership-request-success",
  },
  callbackRequest: {
    title: "Заявка на партнерство",
    link: () => "/callback-request",
    segment: "partnership-request",
  },
  callbackRequestSuccess: {
    title: "Заявка успешно отправлена",
    link: () => "/callback-request/success",
    segment: "partnership-request-success",
  },
  marketplace: {
    title: "Каталог",
    link: () => `/marketplace`,
    segment: "marketplace",
  },
  contacts: {
    title: "Контакты",
    link: () => `/marketplace`,
    segment: "contacts",
  },
  product: {
    title: "Товар",
    link: (id: string) => `/marketplace/${id}`,
    segment: "product",
  },
  productSpec: {
    title: "Характеристика товара",
    link: (id: string) => `/marketplace/${id}/specification`,
    segment: "product-specification",
  },
  cart: { title: "Корзина", link: () => `/cart`, segment: "cart" },
  cartRequest: {
    title: "Оформление заказа",
    link: () => `/cart/request`,
    segment: "cart",
  },
  cartRequestSuccess: {
    title: "Оформление заказа",
    link: () => `/cart/request/success`,
    segment: "cart",
  },
  about: { title: "О компании", link: () => `/about`, segment: "about" },
  advantages: {
    title: "Преимущества",
    link: () => `/advantages`,
    segment: "advantages",
  },
  partnership: {
    title: "Стать партнером",
    link: () => `/partnership`,
    segment: "partnership",
  },
  projects: {
    title: "Примеры реализации",
    link: () => `/projects`,
    segment: "(projects-index)",
  },
  project: {
    title: "Пример реализации",
    link: (id: string) => `/projects/${id}`,
    segment: "projects",
  },
  articles: {
    title: "Примеры реализации",
    link: () => `/articles`,
    segment: "(articles-index)",
  },
  article: {
    title: "Пример реализации",
    link: (id: string) => `/articles/${id}`,
    segment: "articles",
  },
  delivery: {
    title: "Доставка",
    link: () => `/delivery`,
    segment: "(delivery-index)",
  },
  docs: {
    title: "Документы",
    link: () => `/docs`,
    segment: "docs",
  },
  planner: {
    title: "",
    link: () => `/planner`,
    segment: "planner",
  },
};
