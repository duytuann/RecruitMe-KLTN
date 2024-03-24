import {lazy} from "react";
const Interview = lazy(() => import("app-employer/pages/Interview/Interview"));

const routes = [
  {
    path: "/interviews",
    name: "interviews",
    exact: true,
    element: Interview,
  },
];

export default routes;
