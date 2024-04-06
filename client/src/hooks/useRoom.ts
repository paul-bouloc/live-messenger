import { Message } from "@/models/message";
import { Room } from "@/models/room";
import { useReducer } from "react";

interface ReducerState {
  roomLoaded: boolean;
  room: Room;
}

interface setRoom {
  type: "SET_ROOM";
  payload: Room;
}

interface addMessage {
  type: "ADD_MESSAGE";
  payload: Message;
}

type RoomListActions = setRoom | addMessage;

function roomReducer(state:ReducerState, action: RoomListActions) {
  switch (action.type) {
    case "SET_ROOM":
      return {
        roomLoaded: true,
        room: action.payload
      };
    case "ADD_MESSAGE":
      return {
        roomLoaded: true,
        room: {
          ...state.room,
          messages: [...state.room.messages, action.payload]
        }
      };
  }
}

export function useRoom() {
  const [state, dispatch] = useReducer(roomReducer, {
    roomLoaded: false,
    room: {} as Room
  });

  return {
    roomLoaded: state.roomLoaded,
    roomNotLoaded: !state.roomLoaded,
    room: state.room,
    setRoom: (room: Room) => dispatch({ type: "SET_ROOM", payload: room }),
    addMessage: (message: Message) => dispatch({ type: "ADD_MESSAGE", payload: message }),
  };
}