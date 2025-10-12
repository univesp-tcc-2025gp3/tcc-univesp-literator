import { AuthProvider } from "./contexts/auth-context";
import { Routes } from "./routes";
  import { ToastContainer } from 'react-toastify';

export function App() {

  return (
    <AuthProvider>
      <Routes />
      <ToastContainer />
    </AuthProvider>
    
  )
}

