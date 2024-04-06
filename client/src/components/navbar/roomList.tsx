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

    socket.on("room:new", addRoom);
    rooms.map(() => {
      socket.on("message:new", (payload) => updateLastMessage(payload.roomId, payload.message))
    })
    
    return () => {
      socket.off("room:new", addRoom);
      rooms.map(() => {
        socket.off("message:new", (payload) => updateLastMessage(payload.roomId, payload.message))
      })
    };
  }, [rooms, addRoom, updateLastMessage]);
  
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