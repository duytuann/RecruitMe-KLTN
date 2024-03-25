import {Row, Space, Table, Tag} from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
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
    title: "Action",
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

const Interview = () => {
  return (
    <>
      <Row className={styles.funcHead}>
        <Col className={styles.createIRBtn}>
          <PermissionBlock
            subModule={
              InfringementReportListPermission
                .InfringementReportListInProgessCompletedDraftInGeneral.Create
            }
          >
            {activeNum !== EStateCode.Completed && (
              <div>
                <Button
                  type="link"
                  icon={<PlusCircleOutlined />}
                  onClick={handleClickCreateIR}
                >
                  <span style={{marginLeft: "-4px", textDecoration: "none"}}>
                    Create an Infringement Report
                  </span>
                </Button>
              </div>
            )}
          </PermissionBlock>
        </Col>
        <Col>
          <PermissionBlock
            subModule={[
              InfringementReportListPermission
                .InfringementReportListInProgessCompletedDraftInGeneral.Read,
              InfringementReportListPermission.ApproverADSAD.Read,
              InfringementReportListPermission.ApproverAdjudicationPanel.Read,
              InfringementReportListPermission.ApproverBlockManager.Read,
              InfringementReportListPermission.ApproverDirectorHeadofHome.Read,
              InfringementReportListPermission.ApproverProvost.Read,
            ]}
          >
            <Tooltip
              title={<span style={{color: "#222"}}>Filter</span>}
              color={"#fff"}
              open={filterTip}
            >
              <div
                className={styles.filterDesktop}
                onClick={openFilterPanel}
                onMouseOver={() => {
                  if (isMobile.type != EDeviceType.Tablet) {
                    setFilterTip(true);
                  }
                }}
                onTouchStart={() => {
                  setFilterTip(true);
                }}
                onMouseOut={() => {
                  if (isMobile.type != EDeviceType.Tablet) {
                    setFilterTip(false);
                  }
                }}
                onTouchEnd={() => {
                  setFilterTip(false);
                }}
              >
                <img src={filterIcon} alt="iconFilter" />
              </div>
            </Tooltip>
          </PermissionBlock>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        className="hcis-border-table"
      />
    </>
  );
};

export default Interview;
