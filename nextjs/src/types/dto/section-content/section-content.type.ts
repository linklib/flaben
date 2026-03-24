import { BaseType } from "@/types/dto/base/base.type";
import { ImageType } from "@/types/dto/image/image.type";

interface SectionContent {
  content: {
    title: string;
    description?: string;
    image: ImageType;
  };
}

export interface SectionContentType extends BaseType<SectionContent> {}
