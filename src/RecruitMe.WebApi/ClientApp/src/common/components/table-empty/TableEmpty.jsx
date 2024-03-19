import {SmileOutlined} from "@ant-design/icons";
import styles from "./TableEmpty.module.scss";
const TableEmpty = () => {
  return (
    <div className={`${styles.tableEmpty} hcis-table-empty-data`}>
      <SmileOutlined />
      <div className="table-empty-text">There are no records to display.</div>
    </div>
  );
};

export default TableEmpty;
