import {Form, Input, Button, Row, Col, Select, DatePicker, Switch} from "antd";

const {Option} = Select;

const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    // Tại đây bạn sẽ gọi API để cập nhật thông tin
  };

  return (
    <>
      <div className="c text-[#121212] font-bold text-2xl mb-6">
        Edit Profile
      </div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Employer name"
              name="employerName"
              rules={[{required: true, message: "Please input employer name!"}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {required: true, message: "Please input email!", type: "email"},
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
        <Row>
          <Col span={24} style={{textAlign: "left"}}>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Profile;
