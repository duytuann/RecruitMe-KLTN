import {lazy} from "react";
import Layout from "../AppLayout";
import Dashboard from "@/app-employer/router/routes/Dashboard";

//login
const Login = lazy(() => import("app-employer/pages/Login/Login"));

export const routers = [
  {
    path: "/login",
    name: "login",
    element: Login,
  },
  {
    path: "/",
    element: Layout,
    name: "layout",
    children: [...Dashboard],
  },
];
