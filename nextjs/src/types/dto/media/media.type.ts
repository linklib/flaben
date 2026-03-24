import { BaseType } from "@/types/dto/base/base.type";
import { ImageType } from "@/types/dto/image/image.type";

interface Media {
  image: ImageType;
}

export interface MediaType extends BaseType<Media> {}
