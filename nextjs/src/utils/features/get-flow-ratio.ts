import { RoomType } from "@/types/room.type";
import { FloorType } from "@/types/floor.type";
import { getRoomVolume } from "@/utils/features/get-room-volume";

export const getFlowRatio = (
  room: RoomType,
  floor: FloorType,
  consumptionRate: number,
) => {
  try {
    return consumptionRate / getRoomVolume(room, floor);
  } catch (e) {
    return 0;
  }
};
