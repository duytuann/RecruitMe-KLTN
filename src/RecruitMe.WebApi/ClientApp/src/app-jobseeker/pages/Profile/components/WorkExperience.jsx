import {BiPlus, BiEdit, BiTrash} from "react-icons/bi";
import ViewRichText from "./ViewRichText";
import {useEffect, useState} from "react";
import WorkExperienceModal from "./WorkExperienceModal";
import moment from "moment";
import {Modal} from "antd";
import {useLoading} from "../../../../common/context/useLoading";
import service from "../../../../common/service";

const WorkExperience = (props) => {
  const {profile, getDetailJobSeekerProfileById} = props;

  const [modalMode, setModalMode] = useState("create");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {showLoading, closeLoading} = useLoading();

  const [workExperiences, setWorkExperiences] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  const handleEdit = () => {
    setModalMode("edit");
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setModalMode("create");
    setIsModalVisible(true);
    setSelectedData({});
  };

  const deleteWorkExperience = async (id) => {
    if (!id) return;
    showLoading();
    const updatedExperiences = workExperiences.filter((item) => item.id !== id);

    setWorkExperiences(updatedExperiences);

    await service.jobseeker.updateJobSeekerProfile({
      workExperiences: JSON.stringify(updatedExperiences),
      updateType: 3,
      userId: JSON.parse(localStorage.getItem("auth"))?.userId,
    });
    closeLoading();
  };

  const handleDelete = (id) => {
    console.log(id);
    Modal.confirm({
      title: "Are you sure you want to delete this work experience?",
      onOk: () => {
        deleteWorkExperience(id);
      },
    });
  };

  useEffect(() => {
    if (profile?.workExperiences) {
      setWorkExperiences(JSON.parse(profile?.workExperiences) || []);
      console.log(JSON.parse(profile?.workExperiences));
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
          {workExperiences?.map((item) => {
            return (
              <div key={item?.id} className="mt-4">
                <div className="flex justify-between">
                  <div className="text-[18px] font-bold">
                    {item?.jobTitle ?? "Software Engineer"}
                  </div>
                  <div>
                    <BiEdit
                      onClick={() => {
                        handleEdit();
                        setSelectedData(item);
                      }}
                      size={24}
                      className="mx-2"
                    />
                    <BiTrash size={24} onClick={() => handleDelete(item.id)} />
                  </div>
                </div>
                <div className="text-base font-semibold">
                  {item?.company ?? "AvePoint"}
                </div>
                <div className="text-base font-semibold">
                  {moment(item?.fromDate).format("MMMM D, YYYY")} -{" "}
                  {item?.toDate
                    ? moment(item?.toDate).format("MMMM D, YYYY")
                    : "Now"}
                </div>
                <div className="text-[18px] font-bold">Experience:</div>
                <div className="text-base font-semibold py-2">
                  <ViewRichText value={item?.experience} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <WorkExperienceModal
        isVisible={isModalVisible}
        mode={modalMode}
        initialData={selectedData}
        onCancel={() => setIsModalVisible(false)}
        workExperiences={workExperiences}
        getDetailJobSeekerProfileById={getDetailJobSeekerProfileById}
      />
    </>
  );
};

export default WorkExperience;
