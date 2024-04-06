import AppLayout from "../AppLayout";
import Home from "@/app-jobseeker/router/routes/Home";
import Job from "@/app-jobseeker/router/routes/Job";
import Login from "@/app-jobseeker/router/routes/Login";
import Register from "@/app-jobseeker/router/routes/Register";
import Profile from "@/app-jobseeker/router/routes/Profile";

export const routers = [
  {
    path: "/",
    element: AppLayout,
    name: "layout",
    children: [...Login, ...Register, ...Home, ...Job, ...Profile],
  },
];
