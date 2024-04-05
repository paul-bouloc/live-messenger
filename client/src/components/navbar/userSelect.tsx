import { Link } from "react-router-dom";
import UserAvatar from "../userAvatar";
import { useAuth } from "@/hooks/useAuth";

export default function UserSelect() {

  const {user} = useAuth();

  return (
    <Link
      to="/profile"
      className="flex items-center w-full gap-2 p-2 transition-all border cursor-pointer rounded-2xl hover:bg-slate-200/40 shadow-gray-300">

      <UserAvatar className="w-12 h-12" />

      <div className="flex flex-col gap-0.5">
        <div className="text-lg font-bold leading-5">{user?.name}</div>
        <div className="text-sm leading-4 text-slate-400">Voir le profil</div>
      </div>

    </Link>
  )
}