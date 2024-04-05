import UserSelect from "./userSelect";
import { Separator } from "../ui/separator";
import RoomList from "./roomList";
import LogoutButton from "./logoutButton";
import NewRoomButton from "./newRoomButton";

export default function Navbar() {
  return (
    <div className="flex flex-col h-screen gap-4 p-4 bg-white border-r w-96 shrink-0">
      <UserSelect/>
      <Separator/>
      <RoomList/>
      <Separator/>
      <div className="flex w-full gap-4">
        <LogoutButton/>
        <NewRoomButton/>
      </div>
    </div>
  )
}