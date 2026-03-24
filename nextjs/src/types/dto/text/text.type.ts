import { BaseType } from "@/types/dto/base/base.type";

interface Text {
  text: string;
}

export interface TextType extends BaseType<Text> {}
