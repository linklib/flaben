import { BaseType } from "@/types/dto/base/base.type";
import { ImagesType, ImageType } from "@/types/dto/image/image.type";
import { BlocksContent } from "@strapi/blocks-react-renderer";

interface Project {
  title: string;
  description: BlocksContent;
  image: ImageType;
  images: ImagesType;
}

export interface ProjectType extends BaseType<Project> {}
