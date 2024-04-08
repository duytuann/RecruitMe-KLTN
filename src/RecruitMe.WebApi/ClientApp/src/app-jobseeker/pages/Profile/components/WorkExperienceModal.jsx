import {Modal, Form, DatePicker, Input, Button, Checkbox, Row, Col} from "antd";
import moment from "moment";
import {useEffect, useRef, useState} from "react";
import RichText from "../../../../common/components/rich-text-editor/RichTextEditor";
import {v4 as uuidv4} from "uuid";
import {useLoading} from "../../../../common/context/useLoading";
import service from "../../../../common/service";

const WorkExperienceModal = ({
  isVisible,
  mode,
  onCancel,
  initialData,
  workExperiences,
  getDetailJobSeekerProfileById,
}) => {
  const richTextRef = useRef(null);
  const [form] = Form.useForm();
  const {showLoading, closeLoading} = useLoading();
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const generateUniqueId = () => {
    return uuidv4(); // Generates a unique ID
  };

  const onFormFinish = async (values) => {
    showLoading();
    const temp = workExperiences;

    if (initialData.id) {
      const index = workExperiences.findIndex((w) => w.id === initialData.id);
      if (index > -1) {
        temp[index] = {
          ...values,
          experience: richTextRef?.current?.getValue(),
        };
      }
    } else {
      const newWorkExperience = {
        ...values,
        experience: richTextRef?.current?.getValue(),
        id: generateUniqueId(),
      };

      temp.push(newWorkExperience);
    }

    await service.jobseeker.updateJobSeekerProfile({
      workExperiences: JSON.stringify(temp),
      updateType: 3,
      userId: JSON.parse(localStorage.getItem("auth"))?.userId,
    });

    getDetailJobSeekerProfileById();
    onCancel();
    closeLoading();
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.setFieldsValue({
        ...initialData,
        fromDate: initialData.fromDate ? moment(initialData.fromDate) : null,
        toDate: initialData.toDate ? moment(initialData.toDate) : null,
        experience: richTextRef.current?.setValue(
          initialData?.experience?.toString() ?? ""
        ),
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form, mode]);

  const title =
    mode === "edit" ? "Edit Work Experience" : "Add Work Experience";

  const onCheckboxChange = (e) => {
    setIsCurrentlyWorking(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({toDate: undefined});
    }
  };

  return (
    <Modal
      centered
      width={800}
      title={title}
      open={isVisible}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {mode === "edit" ? "Update" : "Create"}
        </Button>,
      ]}
    >
      <div className="overflowY-auto">
        <Form form={form} layout="vertical" onFinish={onFormFinish}>
          <Form.Item
            name="jobTitle"
            label="Job Title"
            rules={[{required: true, message: "Please input the job title!"}]}
          >
            <Input className="h-[44px]" placeholder="Enter job title" />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company"
            rules={[
              {required: true, message: "Please input the company name!"},
            ]}
          >
            <Input className="h-[44px]" placeholder="Enter company name" />
          </Form.Item>

          <Form.Item name="currentlyWorkingHere" valuePropName="checked">
            <Checkbox onChange={onCheckboxChange} className="pt-4">
              <span className="text-[16px]">I am currently working here</span>
            </Checkbox>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fromDate"
                label="From"
                rules={[
                  {required: true, message: "Please select the start date!"},
                ]}
              >
                <DatePicker style={{width: "100%"}} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="toDate" label="To">
                <DatePicker
                  disabled={isCurrentlyWorking}
                  style={{width: "100%"}}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="experience" label="Experience">
            <RichText ref={richTextRef} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default WorkExperienceModal;
