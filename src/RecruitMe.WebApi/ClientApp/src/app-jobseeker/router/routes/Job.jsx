import {lazy} from "react";
const JobDetail = lazy(() =>
  import("@/app-jobseeker/pages/JobDetail/JobDetail")
);

const routes = [
  {
    path: "/job/:id",
    name: "jobs",
    element: JobDetail,
  },
];

export default routes;
