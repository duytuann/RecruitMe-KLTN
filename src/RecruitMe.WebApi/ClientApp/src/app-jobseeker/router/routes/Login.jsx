import {lazy} from "react";
const Login = lazy(() => import("app-jobseeker/pages/Login/Login"));

const routes = [
  {
    path: "/login",
    name: "login",
    exact: true,
    element: Login,
  },
];

export default routes;
