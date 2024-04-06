import {useLoading} from "@/common/context/useLoading";
import LazyLoading from "../common/components/lazy-loading/LazyLoading";
import {Outlet} from "react-router-dom";

import Navbar from "./components/Navbar";

const AppLayout = () => {
  const {isLoading} = useLoading();

  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      {isLoading && <LazyLoading />}
    </div>
  );
};

export default AppLayout;
