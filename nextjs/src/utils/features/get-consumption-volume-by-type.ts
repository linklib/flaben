import { AirTypeEnum } from "@/utils/enums/air-type.enum";
import { FloorType } from "@/types/floor.type";

export const getConsumptionVolumeByType = (
  floors: FloorType[],
  airType: AirTypeEnum,
) => {
  const consumption = floors
    .flatMap((floor) =>
      floor.rooms.map((room) => {
        if (room.airType === airType)
          return room.airConsumption
            ? room.airConsumption
            : floor.height * room.length * room.width * room.people;
        else return 0;
      }),
    )
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });

  if (consumption) return Math.round(consumption);
  return 0;
};
