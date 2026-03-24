import { RoomType } from "@/types/room.type";
import { getAirConsumption } from "@/utils/features/get-air-consumption";
import { FloorType } from "@/types/floor.type";
import { plannerValues } from "@/utils/constants/constants";

export const getDuctsNumber = (
  room: RoomType,
  roomFloor: FloorType,
  consumptionRate: number,
) => {
  const roomConsumption = Number(
    getAirConsumption(room, roomFloor, consumptionRate),
  );

  const ductsNumber = (
    roomConsumption % plannerValues.airDuctPipeBandwidth > 5
      ? Math.ceil
      : Math.floor
  )(roomConsumption / plannerValues.airDuctPipeBandwidth);
  return ductsNumber < 1 ? 1 : ductsNumber;
};
