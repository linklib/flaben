import { PlannerStateType } from "@/types/planner-state.type";
import { RoomType } from "@/types/room.type";

export const setRoomParamsFromState = (
  state: PlannerStateType,
  newRoom: RoomType,
) => {
  return {
    ...state,
    floors: state.floors.map((floor) => {
      if (floor.number === newRoom.floor) {
        return {
          ...floor,
          rooms: floor.rooms.map((floorRoom) => {
            if (floorRoom.number === newRoom.number) {
              return newRoom;
            }
            return floorRoom;
          }),
        };
      }
      return floor;
    }),
  };
};
