import {lazy} from "react";
const Job = lazy(() => import("app-jobseeker/pages/Job/Job"));

const routes = [
  {
    path: "/job/:id",
    name: "jobs",
    exact: true,
    element: Job,
  },
];

export default routes;
