import { Send } from "lucide-react";
import UserSelect from "./userSelect";
import { Separator } from "../ui/separator";
import RoomList from "./roomList";
import LogoutButton from "./logoutButton";
import NewRoomButton from "./newRoomButton";

export default function Navbar() {
  return (
    <div className="flex flex-col h-screen gap-4 p-4 bg-white border-r w-96 shrink-0">
      <div className="flex items-center justify-start w-full gap-2 mb-0.5">
        <Send className="mt-1 text-sky-500" />
        <span className="text-2xl font-bold">LiveMessenger</span>
      </div>
      <UserSelect/>
      <Separator/>
      <RoomList/>
      <Separator/>
      <div className="flex w-full gap-2">
        <LogoutButton/>
        <NewRoomButton/>
      </div>
    </div>
  )
}