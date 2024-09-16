import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth";
import Layout from "../components/layout";
import Users from "../pages/users";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);
