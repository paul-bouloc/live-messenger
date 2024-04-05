import { socket } from "@/socket";
import { Room } from "@/models/room";
import RoomItem from "./roomItem";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Rss } from "lucide-react";
import LoadingBlock from "../loadingBlock";

export default function RoomList() {

  const [rooms, setRooms] = useState<Room[]>([])

  const { error, isFetching } = useQuery({
    queryKey: ['GetRooms'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/room", {
          withCredentials: true
        })
        .then((res) => {
          setRooms(res.data.rooms)
          return res.data
        })
  })

  useEffect(() => {
    const handleNewRoom = (room: Room) => {
      if(!rooms.find(r => r.id === room.id)){
        setRooms((prevRooms:Room[]) => [...prevRooms, room])
      }
    };

    socket.on("room:new", handleNewRoom);

    return () => {
      socket.off("room:new", handleNewRoom);
    };
  }, [rooms]);
  
  if(isFetching) return <LoadingBlock/>
  if(error) return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8 font-semibold text-center rounded-md bg-slate-100">
      <Rss size={40} className="text-red-500"/>
      Impossible de charger<br/>les conversations
    </div>
  )
  return (
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