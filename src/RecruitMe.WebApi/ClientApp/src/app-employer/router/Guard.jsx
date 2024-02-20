import {useEffect} from "react";
import {useRouterGuard} from "@/common/router/useRouterGuard";
import {Modal} from "antd";

const whiteList = ["/login", "/nopermission", "/404", "/login", "/logout"];

const Guard = () => {
  const {afterEach, beforeEach} = useRouterGuard();
  useEffect(() => {
    beforeEach((to, from, next) => {
      const user = localStorage.getItem("auth");
      if (user) {
        if (to.pathname === "/login") {
          next("/");
          return;
        }
      } else if (whiteList.includes(to.pathname)) {
        next();
      } else {
        next("/login");
      }
    });

    //to: Location
    afterEach(() => {
      try {
        Modal.destroyAll();
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  return <></>;
};

export default Guard;
