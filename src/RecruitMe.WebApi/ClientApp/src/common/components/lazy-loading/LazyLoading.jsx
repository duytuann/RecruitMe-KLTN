import {Spin} from "antd";
import styles from "./LazyLoading.module.less";
const LazyLoading = () => {
  return (
    <div className={styles.loadingWapper} data-auto-id="LazyLoading">
      <Spin size="large" />
    </div>
  );
};

export default LazyLoading;
