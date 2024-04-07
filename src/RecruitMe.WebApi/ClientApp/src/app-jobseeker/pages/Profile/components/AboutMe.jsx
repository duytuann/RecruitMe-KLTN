import {BiEdit} from "react-icons/bi";
import {useLoading} from "../../../../common/context/useLoading";
import {useEffect, useRef, useState} from "react";
import {Modal} from "antd";
import RichText from "../../../../common/components/rich-text-editor/RichTextEditor";
import service from "../../../../common/service";

const AboutMe = (props) => {
  const {profile, getDetailJobSeekerProfileById} = props;

  const {showLoading, closeLoading} = useLoading();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const richTextRef = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const updateJobSeekerProfile = async () => {
    try {
      showLoading();

      await service.jobseeker.updateJobSeekerProfile({
        aboutMe: richTextRef.current?.getValue(),
        updateType: 2,
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
    updateJobSeekerProfile();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (profile?.aboutMe !== null) {
      richTextRef.current?.setValue(profile?.aboutMe?.toString() ?? "");
    }
  }, [profile]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-3/4 bg-white my-6 rounded-xl flex-row p-4 shadow-custom">
          <div className="flex justify-between items-center w-full border-b-2 border-gray-300 border-solid">
            <div className="text-[28px] font-bold">About Me</div>
            <BiEdit size={24} onClick={showModal} style={{cursor: "pointer"}} />
          </div>
          <div className="mt-4">
            <RichText isViewMode ref={richTextRef} />
          </div>
        </div>
      </div>
      <Modal
        title="About Me"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        destroyOnClose={false}
      >
        {richTextRef.current && <RichText ref={richTextRef} />}
      </Modal>
    </>
  );
};

export default AboutMe;
