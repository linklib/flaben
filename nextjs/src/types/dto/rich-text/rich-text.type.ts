import { BaseType } from "@/types/dto/base/base.type";
import { BlocksContent } from "@strapi/blocks-react-renderer";

interface RichText {
  text: BlocksContent;
}

export interface RichTextType extends BaseType<RichText> {}
