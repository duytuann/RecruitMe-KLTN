import {useLoading} from "@/common/context/useLoading";
import LazyLoading from "@/common/components/lazy-loading/LazyLoading";

const Login = () => {
  const {isLoading} = useLoading();

  return (
    <>
      <div>Login Job Seeker</div>
      {isLoading && <LazyLoading />}
    </>
  );
};

export default Login;
