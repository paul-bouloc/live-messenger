import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export function useAuth() {
  const {user, setUser} = useContext(AuthContext);

  return {user, setUser};
}