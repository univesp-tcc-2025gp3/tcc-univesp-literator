
import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [loading, user]);

  return (
    <div className="h-screen w-screen px-16">

      <div className="flex items-center justify-center h-full w-full gap-10 max-sm:flex-col-reverse"> 
       
        <div className="flex flex-col gap-4"> 
          <div className="flex flex-col gap-2 max-sm:text-center">
            <h1 className="text-5xl font-bold text-gray-800 max-sm:text-2xl">Bem-vindo ao <span className="text-blue-500 uppercase">Literator</span></h1>
            <p className="text-lg text-gray-600">Descubra sua próxima leitura favorita. Nosso software de recomendação usa inteligência artificial para analisar seus gostos e sugerir livros que você realmente vai amar. Pare de procurar, comece a ler!</p>
          </div>
          <button onClick={login} className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-300 w-[280px] max-sm:w-full">
          Entrar com conta Google
        </button>
        </div>
         <img src="/landing.png" alt="Logo" className="w-[800px] z-10 max-sm:w-[400px]" />
      </div>
   
    </div>
  )
}