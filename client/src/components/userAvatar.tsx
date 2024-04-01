import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Props = {
  name?:string
  className?: string
}

export default function UserAvatar({name, className}: Props) {

  const {user} = useAuth();

  return (
    <Avatar className={className}>
      <AvatarFallback className="text-xl font-semibold text-white bg-sky-500">{ name || user?.name[0].toUpperCase() || "?" }</AvatarFallback>
    </Avatar>
  )
}