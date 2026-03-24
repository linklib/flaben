import { RoomType } from "@/types/room.type";

export interface FloorType {
  number: number;
  height: number;
  rooms: RoomType[];
}
