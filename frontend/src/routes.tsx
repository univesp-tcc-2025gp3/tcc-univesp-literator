import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";

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
  ]);

  return (
    <RouterProvider router={router} />
  )
}