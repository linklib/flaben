import { BaseType } from "@/types/dto/base/base.type";

export interface Image {
  name: string;
  alternativeText: {};
  caption: {};
  width: number;
  height: number;
  formats: { thumbnail: {} };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: {};
  provider: string;
  provider_metadata: {};
}

export interface ImageType {
  data: BaseType<Image>;
}

export interface ImagesType {
  data: BaseType<Image>[];
}
