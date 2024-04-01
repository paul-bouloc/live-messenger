import { MessageSquarePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function NewRoomButton() {
  return (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger className="w-full" asChild>
            <Button className="w-full">
              <MessageSquarePlus size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Nouveau message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  )
}