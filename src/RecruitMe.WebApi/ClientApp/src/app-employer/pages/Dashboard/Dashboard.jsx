import {useEffect} from "react";
import service from "../../../common/service";

const Dashboard = () => {
  const userId = JSON.parse(localStorage.getItem("auth"))?.userId;

  const autoInactiveExpriedJob = async () => {
    await service.job.autoInactiveExpriedJob({
      userId,
    });
  };

  useEffect(() => {
    autoInactiveExpriedJob();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
