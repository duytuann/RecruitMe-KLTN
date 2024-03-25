import {lazy} from "react";
const Job = lazy(() => import("app-employer/pages/Job/Job"));
const CreateJob = lazy(() =>
  import("app-employer/pages/Job/CreateJob/CreateJob")
);

const routes = [
  {
    path: "/jobs",
    name: "jobs",
    exact: true,
    element: Job,
  },
  {
    path: "/jobs/create-job",
    name: "createjob",
    exact: true,
    element: CreateJob,
  },
];

export default routes;
