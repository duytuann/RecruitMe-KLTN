import {lazy} from "react";
import AppLayout from "../AppLayout";
import Home from "@/app-jobseeker/router/routes/Home";

const Login = lazy(() => import("app-jobseeker/pages/Login/Login"));
const Register = lazy(() => import("app-jobseeker/pages/Register/Register"));

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
    element: AppLayout,
    name: "layout",
    children: [...Home],
  },
];
