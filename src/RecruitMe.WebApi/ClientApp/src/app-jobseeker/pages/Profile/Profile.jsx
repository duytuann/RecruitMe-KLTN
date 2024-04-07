import {useEffect, useState} from "react";
import Information from "./components/Information";
import service from "../../../common/service";
import {useLoading} from "../../../common/context/useLoading";
import AboutMe from "./components/AboutMe";
import WorkExperience from "./components/WorkExperience";

const Profile = () => {
  const userId = JSON.parse(localStorage.getItem("auth"))?.userId;

  const {showLoading, closeLoading} = useLoading();
  const [profile, setProfile] = useState();

  const getDetailJobSeekerProfileById = async () => {
    try {
      showLoading();
      const result = await service.jobseeker.getJobSeekerDetailById(userId);

      if (result) {
        setProfile(result);
      }
      closeLoading();
    } catch {
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getDetailJobSeekerProfileById();
  }, []);

  return (
    <div className="bg-[#f4f4f4] flex-row items-center justify-center">
      <Information
        profile={profile}
        getDetailJobSeekerProfileById={getDetailJobSeekerProfileById}
      />
      <AboutMe
        profile={profile}
        getDetailJobSeekerProfileById={getDetailJobSeekerProfileById}
      />
      <WorkExperience
        profile={profile}
        getDetailJobSeekerProfileById={getDetailJobSeekerProfileById}
      />
    </div>
  );
};

export default Profile;
