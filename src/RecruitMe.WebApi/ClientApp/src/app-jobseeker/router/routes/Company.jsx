import {lazy} from "react";
const Company = lazy(() => import("app-jobseeker/pages/Company/Company"));

const routes = [
  {
    path: "/companies",
    name: "companies",
    exact: true,
    element: Company,
  },
];

export default routes;
