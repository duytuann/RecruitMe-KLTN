import {lazy} from "react";
import AppLayout from "../AppLayout";
import Dashboard from "@/app-employer/router/routes/Dashboard";
import Profile from "@/app-employer/router/routes/Profile";
import Job from "@/app-employer/router/routes/Job";
import Applicant from "@/app-employer/router/routes/Applicant";
import Candidate from "@/app-employer/router/routes/Candidate";

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
    element: AppLayout,
    name: "layout",
    children: [...Dashboard, ...Profile, ...Job, ...Applicant, ...Candidate],
  },
];
