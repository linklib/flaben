import { AirTypeEnum } from "@/utils/enums/air-type.enum";

export interface RoomType {
  number: number;
  name: string;
  airType: AirTypeEnum;
  width: number;
  length: number;
  people: number;
  airConsumption?: number;
  floor?: number;
}
