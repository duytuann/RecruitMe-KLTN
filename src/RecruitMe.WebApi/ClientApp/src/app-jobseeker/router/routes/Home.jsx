import {lazy} from "react";
const Home = lazy(() => import("app-jobseeker/pages/Home/Home"));

const routes = [
  {
    path: "/",
    name: "home",
    exact: true,
    element: Home,
  },
];

export default routes;
