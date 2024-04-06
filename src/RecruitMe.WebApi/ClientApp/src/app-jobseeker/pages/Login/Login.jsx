import {useLoading} from "@/common/context/useLoading";
import {Input, Button, Form, notification} from "antd";
import {useNavigate} from "react-router";
import {HeroImage} from "../../assets";
import service from "../../../common/service";
import {EUserType} from "../../../common/service/enums/EUserType";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {closeLoading, showLoading} = useLoading();

  const onFinish = async (values) => {
    showLoading();
    try {
      const body = {
        email: values.email,
        userType: EUserType.Jobseeker,
        password: values.password,
      };
      const result = await service.user.login(body);

      if (result) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            email: values.email,
            userType: EUserType.Employer,
            userId: result.userId,
            userName: result.title,
          })
        );

        localStorage.setItem("accessToken", result.accessToken);

        notification.success({
          message: "Login successfully!",
        });

        navigate("/");
      }
    } catch (error) {
      notification.error({
        message: "Login failed, your email or password is wrong!",
      });
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  return (
    <>
      <div className="flex w-full h-full bg-[#f7fdfd]">
        <div className="w-1/2 flex items-center justify-center lg:w-1/2">
          <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-[#f7fdfd] border-2 border-gray-100">
            <h1 className="text-5xl font-semibold">Welcome Back</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Welcome back! Please enter you details.
            </p>
            <div className="mt-8">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {required: true, message: "Please enter your email!"},
                    {type: "email", message: "Please enter a valid email!"},
                  ]}
                >
                  <Input placeholder="Enter your email" className="h-10" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {required: true, message: "Please enter your password!"},
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="h-10"
                  />
                </Form.Item>
                <Form.Item>
                  <div className="mt-8 flex flex-col gap-y-4">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="active:scale-[.98] h-[60px] border-none active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                    >
                      Login
                    </Button>
                  </div>
                </Form.Item>
              </Form>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">Do not have an account?</p>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="ml-2 font-medium text-base text-blue-500 border-none"
                >
                  Sign up now!
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-[#f7fdfd]">
          <img src={HeroImage} className="object-contain w-full" />
        </div>
      </div>
    </>
  );
};

export default Login;
