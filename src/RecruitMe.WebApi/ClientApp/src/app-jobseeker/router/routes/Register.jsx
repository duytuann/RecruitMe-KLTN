import {lazy} from "react";
const Register = lazy(() => import("app-jobseeker/pages/Register/Register"));

const routes = [
  {
    path: "/register",
    name: "register",
    exact: true,
    element: Register,
  },
];

export default routes;
