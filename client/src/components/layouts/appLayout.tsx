import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../loadingPage";
import { socket } from "@/socket";

export default function AppLayout() {

  const {setUser} = useAuth();
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ['AppLayoutGetUser'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/auth/me", {
          withCredentials: true
        })
        .then((res) => {
          setUser(res.data)
          socket.connect()
          return res.data
        })
        .catch(() => {
          navigate("/auth");
          return null
        }),
    retry: false,
  })

  if(isFetching) return <LoadingPage/>
  if(data) {    
    return (
      <div className="flex w-full h-screen overflow-hidden flex-nowrap text-sky-950">
        <Navbar/>
        <Outlet/>
      </div>
    )
    
  }
}