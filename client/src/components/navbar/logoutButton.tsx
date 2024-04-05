import { Loader2, Power } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { socket } from "@/socket";

export default function LogoutButton() {

  const navigate = useNavigate();

  const logoutQuery = useMutation({
    mutationFn: () => {
      return axios.get(import.meta.env.VITE_API_URL + '/auth/logout', {
        withCredentials: true
      })
        .then(res => res.data)
    },
    onError: () => {
      toast({
        title: <span className="text-red-500">⛔ Erreur</span>,
        description: "Erreur lors de la déconnexion",
      })
    },
    onSuccess: () => {
      socket.disconnect()
      navigate('auth')
    }
  
  });

  const logout = () => {
    logoutQuery.mutate();
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="w-full" asChild>
          <Button
            onClick={() => logout()}
            className="w-full hover:bg-red-100 hover:text-red-500" variant={"secondary"}>
              {
                logoutQuery.isPending ? <Loader2 size={20} className="animate-spin" /> : <Power size={20} />
              }
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Se déconnecter</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}