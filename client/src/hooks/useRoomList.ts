import { Message } from "@/models/message";
import { Room } from "@/models/room";
import { useReducer } from "react";

interface AddRoom {
  type: "ADD_ROOM";
  payload: Room;
}

interface AddMultipleRooms {
  type: "ADD_MULTIPLE_ROOMS";
  payload: Room[];
}

interface RemoveRoom {
  type: "REMOVE_ROOM";
  payload: string;
}

interface UpdateLastMessage {
  type: "UPDATE_LAST_MESSAGE";
  payload: { roomId: string; message: Message };
}

interface SortRooms {
  type: "SORT_ROOMS";
}

type RoomListActions = AddRoom | AddMultipleRooms | RemoveRoom | UpdateLastMessage | SortRooms

function roomListReducer(state:Room[], action: RoomListActions) {
  switch (action.type) {
    case "ADD_ROOM":
      return [action.payload, ...state];
    case "ADD_MULTIPLE_ROOMS":
      return [...action.payload, ...state];
    case "REMOVE_ROOM":
      return state.filter((room) => room.id !== action.payload);
    case "UPDATE_LAST_MESSAGE":
      return state.map((room) => {
        if (room.id === action.payload.roomId) {
          return {
            ...room,
            messages: [...room.messages, action.payload.message],
          }
        }
        return room;
      });
    case "SORT_ROOMS":
      return state.sort((a, b) => {
        const aTime = a.messages[a.messages.length - 1]?.createdAt || a.createdAt;
        const bTime = b.messages[b.messages.length - 1]?.createdAt || b.createdAt;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });
  }
}

export function useRoomList() {
  const [state, dispatch] = useReducer(roomListReducer, []);

  return {
    rooms: state,
    addRoom: (room: Room) => dispatch({ type: "ADD_ROOM", payload: room }),
    addMultipleRooms: (rooms: Room[]) => dispatch({ type: "ADD_MULTIPLE_ROOMS", payload: rooms }),
    removeRoom: (roomId: string) => dispatch({ type: "REMOVE_ROOM", payload: roomId }),
    updateLastMessage: (payload:{roomId: string, message: Message}) => dispatch({ type: "UPDATE_LAST_MESSAGE", payload }),
    sortRooms: () => dispatch({ type: "SORT_ROOMS" }),
  };
}