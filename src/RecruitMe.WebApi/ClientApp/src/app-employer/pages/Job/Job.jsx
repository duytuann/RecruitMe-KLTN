import {Table, Tag, Row, Col, Tooltip, Button, Tabs, Drawer} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import styles from "./Job.module.scss";
import IconFilter from "@/common/assets/svg/IconFilter";
import {useEffect, useState} from "react";
import {useLoading} from "../../../common/context/useLoading";
import {useNavigate} from "react-router";
import service from "../../../common/service";
import moment from "moment";
import {EditOutlined} from "@ant-design/icons";
import {Tab} from "./Job.model";

const Job = () => {
  const [tab, setTab] = useState(Tab.Active);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, record) => <div>{record.title}</div>,
    },
    {
      title: "Applicants",
      dataIndex: "applicants",
      key: "applicants",
      render: () => (
        <div>{Math.floor(Math.random() * 100).toString()} Applicant(s)</div>
      ),
    },
    {
      title: "Start & End date",
      dataIndex: "startEndDate",
      key: "startEndDate",
      render: (_, record) => (
        <div>
          <div>
            Start Date: {moment(record.startDate).format("MMMM D, YYYY")}
          </div>
          <div>
            End Date:{" "}
            <span className="text-red-500">
              {moment(record.endDate).format("MMMM D, YYYY")}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () =>
        tab === 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      width: "10%",
      render: (_, record) => (
        <div>
          <Tooltip
            title={<span style={{color: "#222"}}>Edit</span>}
            color={"#fff"}
          >
            <Button
              type="text"
              onClick={() => {
                navigate(`/jobs/edit-job/${record.id}`);
              }}
              icon={<EditOutlined />}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const userId = JSON.parse(localStorage.getItem("auth"))?.userId;
  const navigate = useNavigate();
  const {showLoading, closeLoading} = useLoading();
  const [jobList, setJobList] = useState();
  // const searchRef = useRef(null);

  const items = [
    {
      key: 1,
      label: "Active",
    },
    {
      key: 2,
      label: "Inactive",
    },
  ];

  const handleTabChange = async (value) => {
    setTab(value);
    console.log(typeof value, value);
    // API get new Data
    // setTableData

    if (value === Tab.Active) {
      await fetchJobList(0);
    } else if (value === Tab.Inactive) {
      await fetchJobList(1);
    }
  };

  const fetchJobList = async (stateCode) => {
    try {
      showLoading();

      const result = await service.job.getlistjob(userId, stateCode);

      if (result) {
        setJobList(result);
      }

      closeLoading();
    } catch (error) {
      closeLoading();
    }
  };

  useEffect(() => {
    fetchJobList(0);
  }, []);

  return (
    <>
      <div className="mt-2">
        <Tabs
          className="hcis-top-tabs"
          items={items}
          onChange={(value) => handleTabChange(value)}
        />
      </div>
      {jobList && (
        <div className="contentWrapper">
          <Row className={styles.funcHead}>
            <Col className={styles.createBtn}>
              <Button
                className="create-btn"
                type="link"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  navigate("/jobs/create-job");
                }}
              >
                <span
                  className="text-sm"
                  style={{marginLeft: "-4px", textDecoration: "none"}}
                >
                  Create a Job
                </span>
              </Button>
            </Col>
            <Col
              onClick={() => {
                console.log("open");
                setOpenFilterDrawer(true);
              }}
            >
              <Tooltip
                title={<span style={{color: "#222"}}>Filter</span>}
                color={"#fff"}
                // open={filterTip}
              >
                <IconFilter />
              </Tooltip>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={jobList}
            className="hcis-border-table"
          />
        </div>
      )}
      <Drawer
        title="Filter Job"
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
    </>
  );
};

export default Job;
