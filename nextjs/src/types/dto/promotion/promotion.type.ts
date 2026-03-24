import { BaseType } from "@/types/dto/base/base.type";
import { ImageType } from "@/types/dto/image/image.type";

interface Promotion {
  title: string;
  description: string;
  image: ImageType;
  until: Date;
}

export interface PromotionType extends BaseType<Promotion> {}
