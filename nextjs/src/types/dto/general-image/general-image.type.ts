import { BaseType } from "@/types/dto/base/base.type";
import { ImageType } from "@/types/dto/image/image.type";

interface GeneralImage {
  image: ImageType;
}

export interface GeneralImageType extends BaseType<GeneralImage> {}
