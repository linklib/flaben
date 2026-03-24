import { AirTypeEnum } from "@/utils/enums/air-type.enum";
import { RoomType } from "@/types/room.type";

export const getBaseRoom = () => {
  return {
    number: 1,
    name: "Помещение",
    airType: AirTypeEnum.Exhaust,
    width: 5,
    length: 5,
    people: 1,
    square: 25,
  } as RoomType;
};
