import { FloorType } from "@/types/floor.type";
import { getFlowRatio } from "@/utils/features/get-flow-ratio";
import { RoomType } from "@/types/room.type";

export const getAirConsumption = (
  room: RoomType,
  floor: FloorType,
  consumptionRate: number,
) => {
  if (room.airConsumption) {
    return room.airConsumption;
  } else {
    const flowRatio = getFlowRatio(room, floor, consumptionRate);
    const volume = room.length * room.width * floor.height;
    if (flowRatio > 1) return flowRatio * volume;
    else return volume * room.people;
  }
};
