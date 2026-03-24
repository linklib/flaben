interface BaseAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface BaseType<T> {
  id: number;
  amount?: number;
  attributes: T & BaseAttributes;
}
