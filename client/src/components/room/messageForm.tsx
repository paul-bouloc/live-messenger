import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  readonly roomId: string;
}

export default function MessageForm({roomId}: Props) {
  return (
    <div className="w-full h-[74px] border-t shrink-0 px-4 gap-4 flex items-center">
      <Input placeholder="Message..." />
      <Button size={"icon"}><SendHorizontal/></Button>
    </div>
  )
}