import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingPage from "../loadingPage";

export default function AuthLayout() {

  const {setUser} = useAuth();
  const navigate = useNavigate();

  const {error, data, isFetching } = useQuery({
    queryKey: ['AuthLayoutGetUser'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/auth/me", {
          withCredentials: true
        })
        .then((res) => {console.log(data);return res.data}),
      retry: false
  })

  if(isFetching) return <LoadingPage/>
  if(data) navigate('/')
  if(error) {

    setUser(data);
    
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,_rgba(14,165,233,.4)_100%)] text-sky-950">
        <Outlet/>
      </div>
    )
    
  }
}