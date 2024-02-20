import {Suspense, useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import LazyLoading from "@/common/components/lazy-loading/LazyLoading";
import {RouterGuardProvider} from "./useRouterGuard";
import {LoadingProvider} from "@/common/context/useLoading";
import {BrowserRouter} from "./BrowserRouter";

const Redirect = ({to}) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

const RouteList = (list) => {
  return list?.map?.((route) => RouteItem(route)).filter((item) => item);
};

const renderSuspense = (route) => {
  if (route.redirectTo) {
    return <Redirect to={route.redirectTo} />;
  }
  if (!route.element) {
    return null;
  }

  return (
    <Suspense fallback={<LazyLoading />}>
      <route.element />
    </Suspense>
  );
};

const RouteItem = (route) => {
  const routerProps = {};
  if (route.exact) {
    routerProps.exact = true;
  }
  return route.index ? (
    <Route index key={route.name} element={renderSuspense(route)} />
  ) : (
    <Route
      {...routerProps}
      key={route.name}
      path={route.path}
      element={renderSuspense(route)}
    >
      {RouteList(route.children ?? [])}
    </Route>
  );
};

const Router = (props) => {
  return (
    <>
      <LoadingProvider>
        <BrowserRouter>
          <RouterGuardProvider>
            {props.children}
            <Routes>{RouteList(props.routes)}</Routes>
          </RouterGuardProvider>
        </BrowserRouter>
      </LoadingProvider>
    </>
  );
};

export default Router;
