import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Breadcrumb,
  Col,
  Row,
  notification,
} from "antd";
import moment from "moment";
import {useState, useRef, useEffect} from "react";
import {useModal} from "@/common/utils/modal/useModal";
import RichText from "../../../../common/components/rich-text-editor/RichTextEditor";
import {useLoading} from "../../../../common/context/useLoading";
import service from "../../../../common/service";
import {useNavigate} from "react-router";
import {useParams} from "react-router";

const {Option} = Select;

const EditJob = () => {
  const [skills, setSkills] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const {showLoading, closeLoading} = useLoading();
  const {openConfirm} = useModal();
  const [startDate, setStartDate] = useState(null);
  const [job, setJob] = useState();

  const richTextRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      showLoading();
      var result = await service.job.updateJob({
        id: id,
        ...values,
        description: richTextRef.current?.getValue(),
      });

      await service.skill.updateJobSkills({
        id: id,
        skills: values.skills.map((skill) => ({id: skill})),
      });

      if (result) {
        notification.success({
          message: "Update Job successfully",
        });
      }
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
        setJob(null);
        navigate("/jobs");
      },
      okText: "Stay",
      cancelText: "Discard",
    });
  };

  const getDetailJobAsync = async () => {
    try {
      showLoading();
      const result = await service.job.getdetailjob(id);
      if (result) {
        console.log(result);
        setJob(result);
        richTextRef.current?.setValue(result?.description?.toString() ?? "");
      }
      closeLoading();
    } catch (error) {
      closeLoading();
    }
  };

  useEffect(() => {
    getDetailJobAsync();
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      title: job?.title,
      jobType: job?.jobType,
      phoneNumber: job?.phoneNumber,
      startDate: moment(job?.startDate),
      endDate: moment(job?.endDate),
      minSalary: job?.minSalary,
      maxSalary: job?.maxSalary,
      gender: job?.gender,
      tag: job?.tag,
      experience: job?.experience,
      jobDescription: job?.description,
      salaryType: job?.salaryType,
      skills: job?.skills?.map((skill) => skill?.id),
    });
    richTextRef.current?.setValue(job?.description?.toString() ?? "");
  }, [job, form]);

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
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/jobs">Job</Breadcrumb.Item>
        <Breadcrumb.Item>Edit Job</Breadcrumb.Item>
      </Breadcrumb>
      {job && (
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Job Title"
                rules={[{required: true}]}
              >
                <Input placeholder="Job Title" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="jobDescription" label="Job Description">
                <RichText ref={richTextRef} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="jobType" label="Type" rules={[{required: true}]}>
                <Select placeholder="Select job type">
                  <Option value={1}>Freelance</Option>
                  <Option value={2}>FullTime</Option>
                  <Option value={3}>Internship</Option>
                  <Option value={4}>Onsite</Option>
                  <Option value={5}>PartTime</Option>
                  <Option value={6}>Remote</Option>
                  <Option value={7}>Temporary</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phoneNumber" label="Phone Number">
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Application Start Date"
                rules={[{required: true}]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                  style={{width: "100%"}}
                  onChange={(value) => {
                    setStartDate(value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="Application End Date"
                rules={[{required: true}]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    !startDate || current < startDate.startOf("day")
                  }
                  style={{width: "100%"}}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select gender">
                  <Option value={1}>Male</Option>
                  <Option value={2}>Female</Option>
                  <Option value={3}>Both</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="salaryType" label="Salary Type">
                <Select placeholder="Select salary type">
                  <Option value={1}>Monthly</Option>
                  <Option value={2}>Weekly</Option>
                  <Option value={3}>Daily</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="minSalary" label="Min. Salary">
                <Input placeholder="Min. Salary" style={{width: "100%"}} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maxSalary" label="Max. Salary">
                <Input placeholder="Max. Salary" style={{width: "100%"}} />
              </Form.Item>
            </Col>

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
              <Form.Item name="experience" label="Experience">
                <Select placeholder="Select experience level">
                  <Option value={1}>Fresh</Option>
                  <Option value={2}>1 Year</Option>
                  <Option value={3}>2 Years</Option>
                  <Option value={4}>3 Years</Option>
                  <Option value={5}>4 Years</Option>
                  <Option value={6}>5 Years</Option>
                </Select>
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
      )}
    </>
  );
};

export default EditJob;
