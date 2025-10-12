import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Admin } from "./pages/admin";

export function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
      
    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    {
      path: "/admin",
      element: <Admin />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}