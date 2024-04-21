// import {popularSearch} from "../utils/data";
import {FaSearch} from "react-icons/fa";
import {AutoComplete} from "antd";

const Header = () => {
  return (
    <div className="bg-custom-gradient">
      <div
        className={`container mx-auto px-5 h-[350px] flex items-center relative`}
      >
        <div className="w-1/2 z-10 pl-20">
          <div className="mb-8">
            <p className="text-white font-bold text-4xl">
              Find The Job That Fits Your Life
            </p>
          </div>

          <div className="max-w-3xl mx-auto h-20 flex items-center space-x-2 bg-white rounded-lg shadow px-4 py-2">
            <FaSearch className="text-gray-400 text-xl mr-2" />
            <AutoComplete
              className="flex-1 h-10 text-gray-700 leading-tight focus:outline-none border-none"
              type="text"
              placeholder="Job title, skills or company"
            />

            <button className="bg-red-600 border-none h-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Find Jobs
            </button>
          </div>

          {/* <div className="w-full lg:1/2 flex flex-wrap gap-3 md:gap-6 py-10 md:py-14">
            {popularSearch.map((search, index) => (
              <span
                key={index}
                className="bg-[#1d4fd826] cursor-pointer text-[#1d4ed8] py-1 px-2 rounded-full text-sm md:text-base"
              >
                {search}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
