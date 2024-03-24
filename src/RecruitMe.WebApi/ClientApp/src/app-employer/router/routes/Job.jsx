import {lazy} from "react";
const Job = lazy(() => import("app-employer/pages/Job/Job"));

const routes = [
  {
    path: "/jobs",
    name: "jobs",
    exact: true,
    element: Job,
  },
];

export default routes;
