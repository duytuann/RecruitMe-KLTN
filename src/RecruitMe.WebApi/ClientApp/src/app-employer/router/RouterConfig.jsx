import {lazy} from "react";
import Layout from "../AppLayout";
import Dashboard from "@/app-employer/router/routes/Dashboard";

const Login = lazy(() => import("app-employer/pages/Login/Login"));
const Register = lazy(() => import("app-employer/pages/Register/Register"));

export const routers = [
  {
    path: "/login",
    name: "login",
    element: Login,
  },
  {
    path: "/register",
    name: "register",
    element: Register,
  },
  {
    path: "/",
    element: Layout,
    name: "layout",
    children: [...Dashboard],
  },
];
