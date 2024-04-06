import {lazy} from "react";
const Applicant = lazy(() => import("app-employer/pages/Applicant/Applicant"));

const routes = [
  {
    path: "/applicants",
    name: "applicant",
    exact: true,
    element: Applicant,
  },
];

export default routes;
