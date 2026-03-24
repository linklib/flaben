import { RoomType } from "@/types/room.type";
import { FloorType } from "@/types/floor.type";

export const getRoomVolume = (room: RoomType, floor: FloorType) => {
  return room.width * room.length * floor.height;
};
