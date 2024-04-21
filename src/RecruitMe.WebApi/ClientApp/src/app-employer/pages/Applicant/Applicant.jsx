import {Table, Tag, Row, Col, Tooltip, Button, Drawer} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import styles from "./Applicant.module.scss";
import IconFilter from "@/common/assets/svg/IconFilter";
import {useEffect, useState} from "react";
import {useLoading} from "../../../common/context/useLoading";
import {useNavigate} from "react-router";
import service from "../../../common/service";
import moment from "moment";
import {EditOutlined} from "@ant-design/icons";

const Applicant = () => {
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
      render: (_, record) => (
        <a>
          https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
        </a>
      ),
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
      render: (_, record) => (
        <div>
          <Tooltip
            title={<span style={{color: "#222"}}>Edit</span>}
            color={"#fff"}
          >
            <Button
              type="text"
              // onClick={() => {
              //   navigate(`/jobs/edit-job/${record.id}`);
              // }}
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
  const [applicants, setApplicants] = useState([]);
  // const searchRef = useRef(null);

  const fetchApplicant = async () => {
    try {
      showLoading();
      const companyId = JSON.parse(localStorage.getItem("auth"))?.id;
      const result = await service.applicant.getjobapplicantsbycompanyid(
        companyId
      );

      if (result) {
        setApplicants(result);
      }

      closeLoading();
    } catch (error) {
      closeLoading();
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
    fetchApplicant();
  }, []);

  return (
    <>
      {jobList && (
        <div className="contentWrapper">
          <Row className={styles.funcHead}>
            <Col className={styles.createBtn}></Col>
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
            dataSource={applicants}
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
    </>
  );
};

export default Applicant;
