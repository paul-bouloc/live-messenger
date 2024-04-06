import LoadingPage from "@/components/loadingPage";
import MessageForm from "@/components/room/messageForm";
import MessageList from "@/components/room/messageList";
import RoomHeader from "@/components/room/roomHeader";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { socket } from "@/socket";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Rss } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

export default function RoomPage() {

  const {user:currentUser} = useAuth();
  const {roomId} = useParams();
  const {roomLoaded, room, setRoom, addMessage} = useRoom();

  const { error, isFetching } = useQuery({
    queryKey: [`GetRoomById-${roomId}`],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/room/${roomId}`, {
          withCredentials: true
        })
        .then((res) => {
          setRoom(res.data.room)
          return res.data
        })
  })

  useEffect(() => {
    function handleNewMessage(payload:{roomId:string, message:Message}) {
      if(payload.roomId === roomId) addMessage(payload.message)
    }

    socket.on("message:new", handleNewMessage)
    return () => {
      socket.off("message:new", handleNewMessage)
    }
  }, [addMessage, roomId])

  function getOtherUser(users:User[]) {
    return users.find((user:User) => user.id !== currentUser!.id)
  }

  if(isFetching) return <LoadingPage/>
  else if(error) return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-8 font-semibold text-center rounded-md bg-slate-100">
      <Rss size={40} className="text-red-500"/>
      Impossible de charger<br/>la conversation
    </div>
  )
  else if(roomLoaded) return (
    <div className="flex flex-col w-full h-screen bg-white">
      <RoomHeader user={getOtherUser(room.users)!}/>
      <MessageList messages={room.messages}/>
      <MessageForm roomId={roomId!}/>
    </div>
  )
}