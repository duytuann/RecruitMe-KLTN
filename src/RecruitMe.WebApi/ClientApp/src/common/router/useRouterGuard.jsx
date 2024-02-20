import {createContext, useContext, useEffect, useRef} from "react";
import {useLocation, useNavigate, matchRoutes} from "react-router";

export const RouterGuardContext = createContext({
  afterEach: () => () => 1,
  beforeEach: () => () => 1,
});

export const tranformRouterToList = (routes, parent) => {
  const result = [];
  routes
    .map((item) => ({...item, element: undefined, meta: {...item.meta}}))
    .forEach((item) => {
      if (item.children) {
        result.push(...tranformRouterToList(item.children, item));
      } else {
        if (item.index) {
          result.push({...item, path: parent?.path});
        } else {
          result.push(item);
        }
      }
    });
  return result;
};

export const findPageRouteByLocation = (routes, currentLocation) => {
  let toRoute;
  const matchRoutesList = matchRoutes(routes, currentLocation);
  if (matchRoutesList?.length) {
    const theRouteDetails = matchRoutesList[matchRoutesList.length - 1];
    toRoute = theRouteDetails?.route;
  }
  return toRoute;
};

export const RouterGuardProvider = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const eventMap = useRef(
    new Map([
      ["beforeEach", new Set()],
      ["afterEach", new Set()],
    ])
  );
  const currentNextResultList = useRef([]);
  const locationInRouterState = useRef({
    from: null,
    to: null,
  });

  useEffect(() => {
    pathnameChange();
  }, [location.pathname]);

  const pathnameChange = async () => {
    locationInRouterState.current.from = locationInRouterState.current.to;
    locationInRouterState.current.to = location;

    await emit("beforeEach");
    await doNext();
    await emit("afterEach");
  };

  const isAsyncFuncLike = (value) => {
    return Object.prototype.toString.call(value) === "[object AsyncFunction]";
  };

  const emit = async (name) => {
    const eventList = Array.from(eventMap.current.get(name) ?? []);
    for (let i = 0; i < eventList.length; i++) {
      const func = eventList[i];

      const isPromise = isAsyncFuncLike(func);
      switch (name) {
        case "beforeEach":
          func(
            locationInRouterState.current.to,
            locationInRouterState.current.from,
            nextFunc
          );
          break;
        default:
          isPromise
            ? await func(locationInRouterState.current.to)
            : func(locationInRouterState.current.to);
          break;
      }
    }
  };

  const nextFunc = (location) => {
    if (!location) {
      currentNextResultList.current.push({
        type: "Pass",
      });
    } else {
      currentNextResultList.current.push({
        type: "Replace",
        path: location,
      });
    }
  };
  const doNext = async () => {
    const needReplaceList = currentNextResultList.current.filter(
      (item) => item.type === "Replace"
    );
    const needReplaceListLength = needReplaceList?.length ?? 0;
    const needReplacePath =
      needReplaceList?.[Math.max(needReplaceListLength - 1, 0)]?.path;
    if (
      needReplacePath &&
      needReplacePath !== locationInRouterState.current.to?.pathname
    ) {
      navigate(needReplacePath, {replace: true});
    }
    currentNextResultList.current = [];
  };
  const beforeEach = (func) => {
    eventMap.current.get("beforeEach")?.add(func);
  };
  const afterEach = (func) => {
    eventMap.current.get("afterEach")?.add(func);
  };

  return (
    <RouterGuardContext.Provider
      value={{
        afterEach,
        beforeEach,
      }}
    >
      {props.children}
    </RouterGuardContext.Provider>
  );
};

export const RouterGuardConsumer = RouterGuardContext.Consumer;

export const useRouterGuard = () => useContext(RouterGuardContext);
