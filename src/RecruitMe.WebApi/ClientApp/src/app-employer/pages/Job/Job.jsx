import {Table, Tag, Row, Col, Tooltip, Button, Tabs} from "antd";
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
      render: () => <Tag color="green">Active</Tag>,
    },
    {
      title: "Action",
      width: "20%",
      render: () => (
        <div>
          <Tooltip
            title={<span style={{color: "#222"}}>Edit</span>}
            color={"#fff"}
          >
            <Button
              type="text"
              onClick={() => {
                navigate("/jobs/edit-job");
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
      key: "ACTIVE",
      label: "Active",
    },
    {
      key: "INACTIVE",
      label: "Inactive",
    },
  ];

  const handleTabChange = (value) => {
    setTab(value);
    // API get new Data
    // setTableData

    if (value === Tab) {
      // do something
    } else if (value === Tab.Inactive) {
      // do something
    }
  };

  const fetchJobList = async () => {
    try {
      showLoading();

      const result = await service.job.getlistjob(userId, 0);

      if (result) {
        setJobList(result);
      }

      closeLoading();
    } catch (error) {
      closeLoading();
    }
  };

  useEffect(() => {
    fetchJobList();
  }, []);

  return (
    <>
      <div className="mt-2">
        <Tabs
          className="hcis-top-tabs"
          items={items}
          onChange={(value) => handleTabChange(+value)}
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
            <Col>
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
    </>
  );
};

export default Job;
