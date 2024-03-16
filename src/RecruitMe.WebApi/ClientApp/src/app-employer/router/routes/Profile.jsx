import {lazy} from "react";
const Profile = lazy(() => import("app-employer/pages/Profile/Profile"));

const routes = [
  {
    path: "/profile",
    name: "profile",
    exact: true,
    element: Profile,
  },
];

export default routes;
