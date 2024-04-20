import {lazy} from "react";
const Company = lazy(() => import("app-jobseeker/pages/Company/Company"));
const CompanyDetail = lazy(() =>
  import("app-jobseeker/pages/CompanyDetail/CompanyDetail")
);

const routes = [
  {
    path: "/companies",
    name: "companies",
    element: Company,
  },
  {
    path: "/companies/:id",
    name: "companiesDetail",
    element: CompanyDetail,
  },
];

export default routes;
