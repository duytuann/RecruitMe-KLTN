import {BiPlus, BiEdit, BiTrash} from "react-icons/bi";
import {useLoading} from "../../../../common/context/useLoading";
import {useEffect, useRef, useState} from "react";
import {Modal} from "antd";
import RichText from "../../../../common/components/rich-text-editor/RichTextEditor";
import service from "../../../../common/service";
import WorkExperienceModal from "./WorkExperienceModal";

const WorkExperience = (props) => {
  const {profile, getDetailJobSeekerProfileById} = props;

  const [modalMode, setModalMode] = useState("create");
  const {showLoading, closeLoading} = useLoading();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const richTextRef = useRef(null);

  const [workExperiences, setWorkExperiences] = useState([]);

  const updateJobSeekerProfile = async () => {
    try {
      showLoading();

      await service.jobseeker.updateJobSeekerProfile({
        aboutMe: richTextRef.current?.getValue(),
        updateType: 3,
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

  const handleEdit = () => {
    setModalMode("edit");
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setModalMode("create");
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (profile?.workExperiences) {
      setWorkExperiences(JSON.parse(profile?.workExperiences) || []);
    }
  }, [profile]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-3/4 bg-white my-6 rounded-xl flex-row p-4 shadow-custom">
          <div className="flex justify-between items-center w-full border-b-2 border-gray-300 border-solid">
            <div className="text-[28px] font-bold">Work Experience</div>
            <BiPlus
              size={24}
              onClick={handleCreate}
              style={{cursor: "pointer"}}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <div className="text-[18px] font-bold">Job Title</div>
              <div>
                <BiEdit onClick={handleEdit} size={24} className="mx-2" />
                <BiTrash size={24} />
              </div>
            </div>
            <div className="text-base font-semibold">Company</div>
            <div className="text-base font-semibold">
              09/2022 - NOW - CurrentlyWorkingHere
            </div>
            <div className="text-base font-semibold py-2">ref1</div>
            <div className="text-[18px] font-bold">Project:</div>
            <div className="text-base font-semibold py-2">ref2</div>
          </div>
        </div>
      </div>
      <WorkExperienceModal
        isVisible={isModalVisible}
        mode={modalMode}
        // initialData={selectedData}
        // onSubmit={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default WorkExperience;
