import Avatar from "./avatar.jpg";
import {
  BiEdit,
  BiMailSend,
  BiPhone,
  BiCake,
  BiUser,
  BiLocationPlus,
  BiWorld,
} from "react-icons/bi";
import {Form, Modal, Input, Row, Col, Select, DatePicker} from "antd";
import {useState} from "react";
import {useLoading} from "../../../../common/context/useLoading";
import service from "../../../../common/service";
import moment from "moment";

const Information = (props) => {
  const {profile, getDetailJobSeekerProfileById} = props;

  const {showLoading, closeLoading} = useLoading();
  const {Option} = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      title: profile?.title,
      roleTitle: profile?.roleTitle,
      email: profile?.email,
      phoneNumber: profile?.phoneNumber,
      dateOfBirth: null,
      gender: profile?.gender,
      address: profile?.address,
      personalLink: profile?.personalLink,
    });
  };

  const updateJobSeekerProfile = async (values) => {
    try {
      showLoading();

      await service.jobseeker.updateJobSeekerProfile({
        ...values,
        updateType: 1,
        userId: JSON.parse(localStorage.getItem("auth"))?.userId,
      });
      await getDetailJobSeekerProfileById();
      closeLoading();
    } catch (error) {
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateJobSeekerProfile(values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 bg-white my-6 rounded-xl flex shadow-custom">
        <div className="p-6">
          <img src={Avatar} className="w-32 h-32 rounded-full" alt="avatar" />
        </div>

        <div className="p-6 w-full">
          <div className="flex justify-between w-full">
            <div className="text-[28px] font-bold">
              {profile?.title ?? "Your title"}
            </div>
            <BiEdit size={24} onClick={showModal} style={{cursor: "pointer"}} />
          </div>
          <div className="text-lg font-bold">
            {profile?.roleTitle ?? "Your title"}
          </div>
          <div className="flex w-full mt-4">
            <div className="flex items-center w-1/2">
              <BiMailSend size={24} className="mr-2" />
              <div className="text-lg">{profile?.email ?? "Your Email"}</div>
            </div>
            <div className="flex items-center w-1/2">
              <BiPhone size={24} className="mr-2" />
              <div className="text-lg">
                {profile?.phoneNumber ?? "Your Phone Number"}
              </div>
            </div>
          </div>

          <div className="flex w-full mt-4">
            <div className="flex items-center w-1/2">
              <BiCake size={24} className="mr-2" />
              <div className="text-lg">
                {moment(profile?.dateOfBirth).format("MMMM D, YYYY") ??
                  "Your Date Of Birth"}
              </div>
            </div>
            <div className="flex items-center w-1/2">
              <BiUser size={24} className="mr-2" />
              <div className="text-lg">
                {profile?.gender === 1 ? "Male" : "Female" ?? "Your Gender"}
              </div>
            </div>
          </div>

          <div className="flex w-full mt-4">
            <div className="flex items-center w-1/2">
              <BiLocationPlus size={24} className="mr-2" />
              <div className="text-lg">
                {profile?.address ?? "Your Address"}
              </div>
            </div>
            <div className="flex items-center w-1/2">
              <BiWorld size={24} className="mr-2" />
              <div className="text-lg">
                {profile?.personalLink ?? "Your Personal Link"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Edit Information"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical" name="userProfileForm">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Name"
                rules={[{required: true, message: "Please input your name!"}]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="roleTitle" label="Title">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phoneNumber" label="Phone Number">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dateOfBirth" label="Date of Birth">
                <DatePicker style={{width: "100%"}} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select gender">
                  <Option value="1">Male</Option>
                  <Option value="2">Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="personalLink" label="Personal Link">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Information;
