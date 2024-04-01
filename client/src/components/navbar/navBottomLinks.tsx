import { LogOut, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useNavigate } from "react-router-dom";

export default function NavBottomLinks() {

  const navigate = useNavigate();

  const logout = () => {
    console.log("logout")
  }

  return (
    <div className="flex w-full gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger className="w-full" asChild>
            <Button
              onClick={() => logout()}
              className="w-full hover:bg-red-100 hover:text-red-500" variant={"secondary"}>
              <LogOut size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Se déconnecter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger className="w-full" asChild>
            <Button
              onClick={() => navigate("/friends")}
              className="w-full" variant={"secondary"}>
              <Users size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mes amis</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}