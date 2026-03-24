import { BaseType } from "@/types/dto/base/base.type";
import { ProductParamType } from "@/types/dto/product-param/product-param-value.type";

interface ProductParamValue {
  value: string;
  param: ProductParamType;
}

export interface ProductParamValueType extends BaseType<ProductParamValue> {}

export interface ProductParamValuesType {
  data: BaseType<ProductParamValue>[];
}
