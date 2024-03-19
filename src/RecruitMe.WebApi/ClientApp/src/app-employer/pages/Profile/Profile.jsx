import {Form, Input, Button, Row, Col, Select, DatePicker, Switch} from "antd";
import FoldCard from "@/common/components/fold-card/FoldCard";
import {EditOutlined} from "@ant-design/icons";
import TextItem from "@/common/components/text-item/TextItem";
import {useModal} from "@/common/utils/modal/useModal";
import {useState} from "react";
import styles from "./Profile.module.scss";

const {Option} = Select;

const Profile = () => {
  const {openConfirm} = useModal();

  const [isEditMode, setIsEditMode] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // Tại đây bạn sẽ gọi API để cập nhật thông tin
  };

  const handleCancelClick = () => {
    openConfirm({
      title: "Discard Updates",
      content:
        "Are you sure you wish to exit this record? You will lose all unsaved changes.",
      onCancel: () => {
        form.resetFields();
        setIsEditMode(false);
      },
      okText: "Stay",
      cancelText: "Discard",
    });
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditMode(true);
  };

  const editProfile = () => {
    return (
      <div onClick={handleEditClick}>
        <EditOutlined />
        <span className="pl-2 font-semibold">Edit</span>
      </div>
    );
  };

  return (
    <>
      <FoldCard title="Profile" operate={isEditMode ? "" : editProfile()}>
        {isEditMode ? (
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Employer name"
                  name="employerName"
                  rules={[
                    {required: true, message: "Please input employer name!"},
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Website" name="website">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Categories" name="categories">
                  <Select mode="tags" placeholder="Select categories">
                    <Option value="accounting">Accounting</Option>
                    {/* Add more options here */}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Founded Date" name="foundedDate">
                  <DatePicker style={{width: "100%"}} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Company Size" name="companySize">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Show my profile"
                  name="showProfile"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
            <div className="flex gap-2 mt-8">
              <Button onClick={handleCancelClick}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        ) : (
          <div className={styles.profileTable}>
            <Row gutter={[4, 4]}>
              <Col md={12} sm={24} xs={24}>
                <TextItem label="YGM">{"123"}</TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="TCU">{"123"} </TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="EU">{"123"} </TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="CFPS">{"123"} </TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="Others">{"123"}</TextItem>
              </Col>
            </Row>
          </div>
        )}
      </FoldCard>
    </>
  );
};

export default Profile;
