import {ExclamationCircleFilled, InfoCircleFilled} from "@ant-design/icons";
import {App, Button, Space} from "antd";
import styles from "./modal.module.scss";

const useModal = () => {
  const {modal} = App.useApp();

  const openError = (config) => {
    const baseConfig = {
      okText: "OK",
      closable: true,
      centered: true,
      maskClosable: false,
    };
    modal.error({
      icon: <ExclamationCircleFilled />,
      className: `${styles.hcisFunctionModal} ${styles.errorModal} `,
      ...baseConfig,
      ...config,
    });
  };

  const openConfirm = (config) => {
    const baseConfig = {
      title: "Confirm",
      okText: "Yes",
      cancelText: "No",
      closable: true,
      centered: true,
      maskClosable: false,
    };
    modal.confirm({
      icon: <InfoCircleFilled />,
      className: `${styles.hcisFunctionModal} ${styles.confirmModal} `,
      ...baseConfig,
      ...config,
    });
  };

  const openLeave = (config) => {
    const initConfig = {
      title: "Discard Updates",
      content:
        "Are you sure you wish to exit this record? You will lose all unsaved changes.",
      icon: <InfoCircleFilled />,
      className: `${styles.hcisFunctionModal} ${styles.confirmModal} `,
      okText: "Stay",
      cancelText: "Discard",
      closable: true,
      centered: true,
      maskClosable: false,
      transitionName: "",
    };
    const instance = modal.confirm(initConfig);
    const baseConfig = {
      ...initConfig,
      footer: (
        <Space style={{marginTop: 12}}>
          <Button
            onClick={() => {
              config?.onOk?.();
              instance?.destroy();
            }}
          >
            Discard
          </Button>
          <Button
            onClick={() => {
              config?.onCancel?.();
              instance?.destroy();
            }}
            type="primary"
          >
            Stay
          </Button>
        </Space>
      ),
    };
    instance.update({
      ...baseConfig,
      ...config,
    });
  };

  return {openError, openConfirm, openLeave};
};
export {useModal};
