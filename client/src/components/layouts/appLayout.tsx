import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../loadingPage";

export default function AppLayout() {

  const {setUser} = useAuth();
  const navigate = useNavigate();

  const {error, data, isFetching } = useQuery({
    queryKey: ['AppLayoutGetUser'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/auth/me", {
          withCredentials: true
        })
        .then((res) => {console.log(data);return res.data}),
      retry: false
  })

  if(isFetching) return <LoadingPage/>
  if(error) navigate('/auth')
  if(data) {

    setUser(data);
    
    return (
      <div className="flex w-full h-screen overflow-hidden flex-nowrap text-sky-950">
        <Navbar/>
        <Outlet/>
      </div>
    )
    
  }
}