import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";

export default function AppLayout() {
  return (
    <div className="flex w-full h-screen overflow-hidden flex-nowrap">
      <Navbar/>
      <Outlet/>
    </div>
  )
}