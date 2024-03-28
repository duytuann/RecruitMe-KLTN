import {Space, Table, Tag, Row, Col, Tooltip, Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import styles from "./Job.module.scss";
import IconFilter from "@/common/assets/svg/IconFilter";
import TabHeader from "@/common/components/tab-header/TabHeader";
import {useRef, useState} from "react";
import {useNavigate} from "react-router";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Applicants",
    dataIndex: "applicants",
    key: "applicants",
  },
  {
    title: "Created & Expired",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, {tags}) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "ACTION",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const list = [
  {
    title: "Active",
    index: 0,
    isActive: true,
    identifying: 1,
  },
  {
    title: "Inactive",
    index: 1,
    isActive: false,
    identifying: 2,
  },
];

const Job = () => {
  const navigate = useNavigate();
  const [tabList, setTabList] = useState(list);
  const searchRef = useRef(null);

  const tabClick = (val) => {
    if (tabList[val].isActive) return;
    searchRef.current?.clearSearch();

    const arr = [...tabList];
    setTabList(arr);
  };

  const onSearch = (val) => {
    // call api
    console.log(val);
  };

  return (
    <>
      <div className="mt-2">
        <TabHeader tabClick={tabClick} tabList={tabList} search={onSearch} />
      </div>
      <div className="contentWrapper">
        <Row className={styles.funcHead}>
          <Col className={styles.createBtn}>
            <Button
              className="hcis-link-btn p-0"
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
          dataSource={data}
          className="hcis-border-table"
        />
      </div>
    </>
  );
};

export default Job;
