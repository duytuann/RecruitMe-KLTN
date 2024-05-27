import {lazy} from "react";
const Apply = lazy(() => import("app-jobseeker/pages/Apply/Apply"));

const routes = [
  {
    path: "/applies",
    name: "applise",
    exact: true,
    element: Apply,
  },
];

export default routes;
