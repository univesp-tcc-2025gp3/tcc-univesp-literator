import { AuthProvider } from "./contexts/auth-context";
import { Routes } from "./routes";

export function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
    
  )
}

