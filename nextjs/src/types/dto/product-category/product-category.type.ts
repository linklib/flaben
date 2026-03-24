import { BaseType } from "@/types/dto/base/base.type";
import { ImagesType, ImageType } from "@/types/dto/image/image.type";
import { BlocksContent } from "@strapi/blocks-react-renderer";

interface ProductCategory {
  name: string;
  description: string;
  translate?: string;
  longDescription: BlocksContent;
  image: ImageType;
  images: ImagesType;
  slug: string;
  youtubeLink?: string;
  buttonName?: string;
}

export interface ProductCategoryType extends BaseType<ProductCategory> {}
