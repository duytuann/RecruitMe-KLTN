import {Form, Input, Button, Row, Col, Select, notification} from "antd";
import FoldCard from "@/common/components/fold-card/FoldCard";
import {EditOutlined} from "@ant-design/icons";
import TextItem from "@/common/components/text-item/TextItem";
import {useModal} from "@/common/utils/modal/useModal";
import {useEffect, useState, useRef} from "react";
import {useLoading} from "../../../common/context/useLoading";
import styles from "./Profile.module.scss";
import service from "../../../common/service";
import RichText from "@/common/components/rich-text-editor/RichTextEditor";
import ImageUploadDragger from "../../../common/components/upload-image/ImageUploadDragger";

const {Option} = Select;

const Profile = () => {
  const userId = JSON.parse(localStorage.getItem("auth"))?.userId;
  const {showLoading, closeLoading} = useLoading();
  const {openConfirm} = useModal();

  const [profile, setProfile] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // rich-text about me
  const richTextRef = useRef(null);
  // const previewRef = useRef();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      showLoading();
      const result = await service.company.updateCompanyProfile({
        Id: profile.id,
        ...values,
        about: richTextRef.current?.getValue(),
      });

      if (result) {
        setProfile(result);
      }
      notification.success({
        message: "Update employer profile successfully!",
      });
      setIsEditMode(false);
      getCompanyProfile();
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

  useEffect(() => {
    getCompanyProfile();
    richTextRef?.current?.setValue(profile?.about);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      employerName: profile?.title,
      address: profile?.address,
      phoneNumber: profile?.phoneNumber,
      website: profile?.website,
      categories: profile?.categories,
      foundedDate: profile?.foundedDate,
      companySize: profile?.companySize,
      title: profile?.title,
    });

    if (profile?.about) {
      richTextRef?.current?.setValue(profile?.about);
    } else {
      richTextRef?.current?.setEmpty();
    }
  }, [profile, isEditMode]);

  return (
    <>
      <FoldCard title="Logo Image">
        <ImageUploadDragger />
      </FoldCard>

      <FoldCard title="Profile" operate={isEditMode ? "" : editProfile()}>
        {isEditMode ? (
          <Form
            initialValues={{
              employerName: profile?.title,
              phoneNumber: profile?.phoneNumber,
              website: profile?.website,
              categories: profile?.categories,
              foundedDate: profile?.foundedDate,
              companySize: profile?.companySize,
              about: profile?.about,
              address: profile?.address,
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
                <Form.Item label="Categories" name="Categories">
                  <Select
                    mode="tags"
                    style={{width: "100%"}}
                    placeholder="Tags"
                  >
                    <Option key="1">1</Option>
                    <Option key="2">2</Option>
                    <Option key="3">3</Option>
                  </Select>
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
                <TextItem label="Categories">{"pending..."}</TextItem>
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
