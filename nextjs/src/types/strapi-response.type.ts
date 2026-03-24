export type StrapiResponseType<T> = {
  data: T;
  meta?: {};
  confirmation_url:string
};

export type StrapiOneObjectResponseType<T> = {
  data: T;
};
