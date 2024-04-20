import {lazy} from "react";
const Job = lazy(() => import("app-employer/pages/Job/Job"));
const CreateJob = lazy(() =>
  import("app-employer/pages/Job/CreateJob/CreateJob")
);
const EditJob = lazy(() => import("app-employer/pages/Job/EditJob/EditJob"));

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
  {
    path: "/jobs/edit-job/:id",
    name: "editjob",
    element: EditJob,
  },
];

export default routes;
