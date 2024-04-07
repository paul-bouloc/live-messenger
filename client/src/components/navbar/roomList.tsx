import { socket } from "@/socket";
import { Room } from "@/models/room";
import RoomItem from "./roomItem";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Rss } from "lucide-react";
import LoadingBlock from "../loadingBlock";
import { useRoomList } from "@/hooks/useRoomList";

export default function RoomList() {

  const {rooms, addMultipleRooms, addRoom, updateLastMessage} = useRoomList();

  const { error, isFetching } = useQuery({
    queryKey: ['GetRooms'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/room", {
          withCredentials: true
        })
        .then((res) => {
          addMultipleRooms(res.data.rooms)
          return res.data
        })
  })

  useEffect(() => {
    function handleNewRoom(payload:Room) {
      if(!rooms.find(room => room.id === payload.id)){
        socket.emit("room:join", payload.id)
        addRoom(payload)
      }
    }

    socket.on("room:new", handleNewRoom);
    socket.on("message:new", updateLastMessage)
    
    return () => {
      socket.off("room:new", handleNewRoom);
      socket.off("message:new", updateLastMessage)
    };
  }, [updateLastMessage, addRoom, rooms]);
  
  if(isFetching) return <LoadingBlock/>
  else if(error) return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8 font-semibold text-center rounded-md bg-slate-100">
      <Rss size={40} className="text-red-500"/>
      Impossible de charger<br/>les conversations
    </div>
  )
  else return (
    <div className="w-full h-full">
      {
        rooms.length ?
        rooms.map((room:Room) => <RoomItem key={room.id} room={room} />)
        : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8 font-semibold text-center rounded-md bg-slate-100">
            Aucune conversation
          </div>
        )
      }
    </div>
  )
}