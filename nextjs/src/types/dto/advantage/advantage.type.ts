import { BaseType } from "@/types/dto/base/base.type";

interface Advantage {
  name: string;
  description: string;
  order: number;
}

export interface AdvantageType extends BaseType<Advantage> {}
