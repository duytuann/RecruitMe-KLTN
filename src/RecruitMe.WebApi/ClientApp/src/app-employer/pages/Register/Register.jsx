import {Form, Input, Button, Select, notification} from "antd";
import {useNavigate} from "react-router-dom";
import Logo from "@/common/assets/svg/Logo";
import {useLoading} from "../../../common/context/useLoading";
import service from "../../../common/service";
import {EUserType} from "../../../common/service/enum/EUserType";

const Register = () => {
  const {showLoading, closeLoading} = useLoading();
  const navigate = useNavigate();
  const {Option} = Select;

  const onFinish = async (values) => {
    try {
      showLoading();
      const result = await service.company.register({
        userName: values.userName,
        email: values.email,
        password: values.password,
        title: values.companyName,
        address: values.address,
        companySize: values.companySize,
        country: values.country,
        userType: EUserType.Employer,
        companyType: values.type,
      });

      console.log("Success:", values);

      if (result) {
        notification.success({
          message: "Đăng ký tài khoản thành công!",
        });

        navigate("/login");
      }

      closeLoading();
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại, có lỗi xảy ra!",
      });
    } finally {
      closeLoading();
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: `Đăng nhập thất bại, có lỗi xảy ra! ${errorInfo}`,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <Logo />
      <div className="max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold text-[#222]">
            Đăng ký tài khoản công ty của bạn
          </h2>
        </div>
        <Form
          name="register_form"
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mt-8 space-y-6"
        >
          <Form.Item
            name="email"
            rules={[
              {type: "email", message: "Email không hợp lệ!"},
              {required: true, message: "Vui lòng nhập email của bạn!"},
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {required: true, message: "Vui lòng nhập mật khẩu của bạn!"},
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="companyName"
            rules={[
              {required: true, message: "Vui lòng nhập tên công ty của bạn!"},
            ]}
          >
            <Input placeholder="Tên công ty" />
          </Form.Item>

          <Form.Item
            name="type"
            rules={[
              {required: true, message: "Vui lòng chọn loại hình công ty!"},
            ]}
          >
            <Select placeholder="Chọn loại hình công ty">
              <Option value="0">Outsource</Option>
              <Option value="1">Product</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            rules={[
              {required: true, message: "Vui lòng nhập địa chỉ công ty!"},
            ]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>

          <Form.Item
            name="companySize"
            rules={[{required: true, message: "Vui lòng nhập quy mô công ty!"}]}
          >
            <Input placeholder="Quy mô công ty" />
          </Form.Item>

          <Form.Item
            name="country"
            rules={[{required: true, message: "Vui lòng nhập quốc gia!"}]}
          >
            <Input placeholder="Quốc gia" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <div className="text-sm text-center">
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            Đã có tài khoản? Đăng nhập
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
