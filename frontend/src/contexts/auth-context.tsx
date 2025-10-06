// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import { browserLocalPersistence, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../services/firebase-config";

// Definindo o formato do contexto
interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean
}

// Criando o contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider que envolve a aplicação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
       setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider).then(() => {
        window.location.replace('/dashboard');
      });
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth).then(() => {
        setUser(null);
        window.location.replace('/');
      });
    } catch (err) {
      console.error("Erro no logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

// Removido useAuth para corrigir erro de Fast Refresh

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
