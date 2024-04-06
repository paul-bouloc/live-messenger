import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { socket } from "@/socket";

type Props = {
  readonly roomId: string;
}

export default function MessageForm({roomId}: Props) {

  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) return

    socket.emit('message:new', {roomId, content: message})

    setMessage('')
  }

  return (
    <div className="w-full h-[74px] border-t shrink-0 px-4 gap-4 flex items-center">
      {/* create form */}
      <form
        className="flex items-center w-full h-full gap-4"
        onSubmit={handleSubmit}
        >
          <Input placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button size={"icon"} type="submit"><SendHorizontal/></Button>
        </form>
    </div>
  )
}