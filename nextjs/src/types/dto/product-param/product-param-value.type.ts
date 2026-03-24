import { BaseType } from "@/types/dto/base/base.type";

interface ProductParam {
  name: string;
  measure?: string;
}

export interface ProductParamType {
  data: BaseType<ProductParam>;
}
