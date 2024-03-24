import {lazy} from "react";
const Analytics = lazy(() => import("@/app-employer/pages/Analytics/Analytics"));

const routes = [
  {
    path: "/analytics",
    name: "analytics",
    exact: true,
    element: Analytics,
  },
];

export default routes;
