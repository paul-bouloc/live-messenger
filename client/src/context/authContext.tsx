import { User } from '@/models/user';
import React, { createContext, useState } from 'react';

interface AuthContextData {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
      
export default function AuthProvider({ children }:{ children: React.ReactNode }) {

  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}