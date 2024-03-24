import {lazy} from "react";
const Candidate = lazy(() => import("app-employer/pages/Candidate/Candidate"));

const routes = [
  {
    path: "/candidates",
    name: "candidates",
    exact: true,
    element: Candidate,
  },
];

export default routes;
