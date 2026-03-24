import { BaseType } from "@/types/dto/base/base.type";

interface SystemAdvantages {
  title: string;
  firstAdvantageTitle: string;
  firstAdvantageDescription: string;
  secondAdvantageTitle: string;
  secondAdvantageDescription: string;
  thirdAdvantageTitle: string;
  thirdAdvantageDescription: string;
  fourthAdvantageTitle: string;
  fourthAdvantageDescription: string;
}

export interface SystemAdvantagesType extends BaseType<SystemAdvantages> {}
