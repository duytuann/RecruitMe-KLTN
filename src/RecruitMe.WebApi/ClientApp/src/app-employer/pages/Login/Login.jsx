import {Form, Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import Logo from "@/common/assets/svg/Logo";
import service from "../../../common/service";
import {EUserType} from "../../../common/service/enums/EUserType";
import {useLoading} from "../../../common/context/useLoading";
import {notification} from "antd";
import LazyLoading from "../../../common/components/lazy-loading/LazyLoading";

const Login = () => {
  const {showLoading, closeLoading, isLoading} = useLoading();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      showLoading();
      const result = await service.user.login({
        email: values.email,
        password: values.password,
        userType: EUserType.Employer,
      });

      if (result) {
        console.log(result);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            email: values.email,
            userType: EUserType.Employer,
            userId: result.userId,
          })
        );

        localStorage.setItem("accessToken", result.accessToken);
        navigate("/");
      }

      closeLoading();
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại, sai email hoặc mật khẩu!",
      });
    } finally {
      closeLoading();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className=" max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-2xl font-bold text-[#222]">
              Đăng nhập vào tài khoản của bạn
            </h2>
          </div>
          <Form
            name="login_form"
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className="text-sm text-center cursor-pointer">
            <div
              onClick={() => {
                navigate("/register");
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Không có tài khoản? Đăng ký
            </div>
          </div>
        </div>
      </div>{" "}
      {isLoading && <LazyLoading />}
    </>
  );
};

export default Login;
