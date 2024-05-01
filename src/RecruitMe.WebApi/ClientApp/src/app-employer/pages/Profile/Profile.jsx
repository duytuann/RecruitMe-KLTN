import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  notification,
  Upload,
  message,
} from "antd";
import FoldCard from "@/common/components/fold-card/FoldCard";
import {EditOutlined} from "@ant-design/icons";
import TextItem from "@/common/components/text-item/TextItem";
import {useModal} from "@/common/utils/modal/useModal";
import {useEffect, useState, useRef} from "react";
import {useLoading} from "../../../common/context/useLoading";
import styles from "./Profile.module.scss";
import service from "../../../common/service";
import RichText from "@/common/components/rich-text-editor/RichTextEditor";
import {PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

const Profile = () => {
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/djvx1q679/upload`;

  const userId = JSON.parse(localStorage.getItem("auth"))?.userId;
  const {showLoading, closeLoading} = useLoading();
  const {openConfirm} = useModal();

  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // rich-text about me
  const richTextRef = useRef(null);
  // const previewRef = useRef();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      console.log(values);
      showLoading();
      const result = await service.company.updateCompanyProfile({
        Id: profile.id,
        ...values,
        about: richTextRef.current?.getValue(),
      });

      await service.skill.updateCompanySkills({
        Id: profile.id,
        skills: values.skills.map((skill) => ({id: skill})),
      });

      if (result) {
        setProfile(result);
      }
      notification.success({
        message: "Update employer profile successfully!",
      });
      setIsEditMode(false);
      getCompanyProfile();
      form.resetFields();
      closeLoading();
    } catch (error) {
      closeLoading();
    } finally {
      closeLoading();
    }
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
    richTextRef.current?.setValue(profile?.about?.toString() ?? "");
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

  const getCompanyProfile = async () => {
    try {
      showLoading();
      const result = await service.company.getCompanyByUserId(userId);

      if (result) {
        setProfile(result);
      }

      closeLoading();
    } catch (error) {
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  // upload image ...

  const getAllSkill = async () => {
    try {
      showLoading();
      const result = await service.skill.getAllSkills();

      if (result) {
        setSkills(result);
      }

      closeLoading();
    } catch (error) {
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getAllSkill();
    getCompanyProfile();
    richTextRef?.current?.setValue(profile?.about);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      employerName: profile?.title,
      address: profile?.address,
      phoneNumber: profile?.phoneNumber,
      website: profile?.website,
      foundedDate: profile?.foundedDate,
      companySize: profile?.companySize,
      title: profile?.title,
      skills: profile?.skills?.map((skill) => skill?.id),
    });

    if (profile?.about) {
      richTextRef?.current?.setValue(profile?.about);
    } else {
      richTextRef?.current?.setEmpty();
    }
  }, [profile, isEditMode]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleUploadChange = async (info) => {
    if (info.file.status === "uploading") {
      showLoading();
      return;
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);

      console.log(info.file.response);
      await service.company.updateCompanyLogo({
        Id: profile.id,
        logoImage: info.file.response.secure_url,
      });
      closeLoading();
      getCompanyProfile();
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      closeLoading();
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <FoldCard title="Logo Image">
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={cloudinaryUploadUrl}
          data={{
            upload_preset: "utgu2xgj",
          }}
          onChange={handleUploadChange}
        >
          {profile?.logoImage ? (
            <img
              src={profile?.logoImage}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </FoldCard>

      <FoldCard title="Profile" operate={isEditMode ? "" : editProfile()}>
        {isEditMode ? (
          <Form
            initialValues={{
              employerName: profile?.title,
              phoneNumber: profile?.phoneNumber,
              website: profile?.website,
              foundedDate: profile?.foundedDate,
              companySize: profile?.companySize,
              about: profile?.about,
              address: profile?.address,
              skills: profile?.skills?.map((skill) => skill?.id),
            }}
            layout="vertical"
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Employer name"
                  name="title"
                  rules={[
                    {required: true, message: "Please input employer name!"},
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Address" name="address">
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
                <Form.Item label="Skills" name="skills">
                  <Select
                    mode="multiple"
                    style={{width: "100%"}}
                    placeholder="Select skills"
                    showSearch
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={skills?.map((skill) => ({
                      label: skill?.title,
                      value: skill?.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Company Size" name="companySize">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="About Company" name="about">
                  <RichText ref={richTextRef} />
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
                <TextItem label="Employer name">
                  {profile?.title ?? "N/A"}
                </TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="Phone Number">
                  {profile?.phoneNumber ?? "N/A"}
                </TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="Address">{profile?.address ?? "N/A"}</TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="Website">{profile?.website ?? "N/A"}</TextItem>
              </Col>

              <Col md={12} sm={24} xs={24}>
                <TextItem label="Skills">
                  {profile?.skills?.map((item) => item?.title).join("; ")}
                </TextItem>
              </Col>
              <Col md={12} sm={24} xs={24}>
                <TextItem label="Company Size">
                  {profile?.companySize ?? "N/A"}
                </TextItem>
              </Col>

              <Col md={24} sm={24} xs={24}>
                <TextItem label="About Company">
                  <RichText isViewMode ref={richTextRef} />
                </TextItem>
              </Col>
            </Row>
          </div>
        )}
      </FoldCard>
    </>
  );
};

export default Profile;
