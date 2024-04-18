import {lazy} from "react";
const Company = lazy(() => import("app-jobseeker/pages/Company/Company"));
const CompanyDetail = lazy(() =>
  import("app-jobseeker/pages/CompanyDetail/CompanyDetail")
);

const routes = [
  {
    path: "/companies",
    name: "companies",
    exact: true,
    element: Company,
  },
  {
    path: "/companies/:id",
    name: "companies",
    exact: true,
    element: CompanyDetail,
  },
];

export default routes;
