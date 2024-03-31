import {useLoading} from "@/common/context/useLoading";
import LazyLoading from "@/common/components/lazy-loading/LazyLoading";

const Register = () => {
  const {isLoading} = useLoading();

  return (
    <>
      <div>Register JobSeeker</div>
      {isLoading && <LazyLoading />}
    </>
  );
};

export default Register;
