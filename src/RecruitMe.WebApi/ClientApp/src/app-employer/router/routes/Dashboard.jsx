import {lazy} from "react";
const Dashboard = lazy(() => import("app-employer/pages/Dashboard/Dashboard"));

const routes = [
  {
    index: true,
    path: "/",
    exact: true,
    name: "dashboard",
    element: Dashboard,
  },
];

export default routes;
