import { BaseType } from "@/types/dto/base/base.type";
import { ImagesType, ImageType } from "@/types/dto/image/image.type";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { ProductParamValuesType } from "@/types/dto/product-param-value/product-param-value.type";
import { ProductCategoryType } from "@/types/dto/product-category/product-category.type";
import { StrapiRelation } from "@/types/strapi-relation";

interface Product {
  name: string;
  description: string;
  image: ImageType;
  images: ImagesType;
  price: number;
  longDescription: BlocksContent;
  category: StrapiRelation<ProductCategoryType>;

  values?: ProductParamValuesType;
  sku?: string;
  sale?: number;
}

export interface ProductType extends BaseType<Product> {}
