import {lazy} from "react";
const Dashboard = lazy(() => import("app-employer/pages/Dashboard/Dashboard"));

const routes = [
  {
    index: true,
    name: "dashboard",
    exact: true,
    element: Dashboard,
  },
];

export default routes;
