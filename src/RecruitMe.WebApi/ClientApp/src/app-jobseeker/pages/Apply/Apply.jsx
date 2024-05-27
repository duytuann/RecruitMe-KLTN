import {
  Table,
  Row,
  Col,
  Tooltip,
  Button,
  Drawer,
  Tabs,
  message,
  Tag,
} from "antd";
import styles from "./Apply.module.scss";
import {useEffect, useState} from "react";
import {useLoading} from "../../../common/context/useLoading";

import service from "../../../common/service";
import moment from "moment";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {useModal} from "../../../common/utils/modal/useModal";

const Apply = () => {
  const {openConfirm} = useModal();

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <div>{record?.name}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <div>{record?.email}</div>,
    },
    {
      title: "CV Link",
      dataIndex: "cvLink",
      key: "cvLink",
      render: (_, record) => <a>{record.cvLink}</a>,
    },
    {
      title: "Submit Date",
      dataIndex: "submitDate",
      key: "submitDate",
      render: (_, record) => (
        <div>Submit Date: {moment(record.created).format("MMMM D, YYYY")}</div>
      ),
    },
    {
      title: "Action",
      width: "10%",
      render: (_, record) => getActionOnTab(record.id),
    },
  ];

  const getActionOnTab = (id) => {
    if (tab === 2) return <Tag color="green">Approval</Tag>;

    if (tab === 3) return <Tag color="red">Reject</Tag>;

    return (
      <div className="flex">
        <div>
          <Tooltip
            title={<span style={{color: "#222"}}>Approve</span>}
            color={"#fff"}
          >
            <Button
              type="text"
              onClick={() => confirmApprove(id)}
              icon={<CheckOutlined />}
            ></Button>
          </Tooltip>
        </div>
        <div>
          <Tooltip
            title={<span style={{color: "#222"}}>Reject</span>}
            color={"#fff"}
          >
            <Button
              type="text"
              onClick={() => confirmReject(id)}
              icon={<CloseOutlined />}
            ></Button>
          </Tooltip>
        </div>
      </div>
    );
  };

  const handleApprove = async (id) => {
    try {
      showLoading();
      const result = await service.applicant.approveJobApplicant({
        jobApplicantId: id,
      });
      if (result) {
        message.success("Job applicant approved successfully!");
        fetchApplicant(tab);
      } else {
        throw new Error("Failed to approve applicant");
      }
      closeLoading();
    } catch (error) {
      message.error(error.message);
      closeLoading();
    }
  };

  const handleReject = async (id) => {
    try {
      showLoading();
      const result = await service.applicant.rejectJobApplicant({
        jobApplicantId: id,
      });
      if (result) {
        message.success("Job applicant rejected successfully!");
        fetchApplicant(tab);
      } else {
        throw new Error("Failed to reject applicant");
      }
      closeLoading();
    } catch (error) {
      message.error(error.message);
      closeLoading();
    }
  };
  const confirmApprove = (id) => {
    openConfirm({
      title: "Are you sure you want to approve this applicant?",
      onOk: () => handleApprove(id),
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const confirmReject = (id) => {
    openConfirm({
      title: "Are you sure you want to reject this applicant?",
      onOk: () => handleReject(id),
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const {showLoading, closeLoading} = useLoading();
  const [applicantList, setApplicantList] = useState();

  const fetchApplicant = async (jobApplicantStatus) => {
    try {
      showLoading();
      const companyId = JSON.parse(localStorage.getItem("auth"))?.id;
      const result = await service.applicant.getjobapplicantsbycompanyid(
        companyId,
        jobApplicantStatus
      );

      if (result) {
        setApplicantList(result);
      }

      closeLoading();
    } catch (error) {
      closeLoading();
    }
  };

  useEffect(() => {
    fetchApplicant(1);
  }, []);

  const items = [
    {
      key: 1,
      label: "Pending",
    },
    {
      key: 2,
      label: "Approval",
    },
    {
      key: 3,
      label: "Reject",
    },
  ];
  const [tab, setTab] = useState(1);

  const handleTabChange = async (value) => {
    setTab(value);
    console.log(typeof value, value);
    // API get new Data
    // setTableData

    if (value === 1) {
      await fetchApplicant(1);
    } else if (value === 2) {
      await fetchApplicant(2);
    } else {
      await fetchApplicant(3);
    }
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-2">
        <Tabs
          className="hcis-top-tabs"
          items={items}
          onChange={(value) => handleTabChange(value)}
        />
      </div>
      {applicantList && (
        <div className="contentWrapper">
          <Row className={styles.funcHead}>
            <Col className={styles.createBtn}></Col>
          </Row>
          <Table
            columns={columns}
            dataSource={applicantList}
            className="hcis-border-table"
          />
        </div>
      )}
      <Drawer
        title="Filter Applicant"
        placement="right"
        closable={false}
        onClose={() => {
          setOpenFilterDrawer(false);
        }}
        open={openFilterDrawer}
        maskClosable={false}
        destroyOnClose
        footer={
          <div className="drawFooter">
            <Button
              style={{fontSize: "14px", color: "#222222", marginRight: "8px"}}
              onClick={() => {
                setOpenFilterDrawer(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              style={{fontSize: "14px", marginRight: "8px"}}
              onClick={() => {
                setOpenFilterDrawer(false);
              }}
            >
              Save
            </Button>
          </div>
        }
      ></Drawer>
    </div>
  );
};

export default Apply;
