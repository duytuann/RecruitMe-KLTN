import {lazy} from "react";
const Profile = lazy(() => import("app-jobseeker/pages/Profile/Profile"));

const routes = [
  {
    path: "/profile",
    name: "profile",
    exact: true,
    element: Profile,
  },
];

export default routes;
