import {useState} from "react";
import {Input, Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Define the function that will handle the search submit
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="bg-black text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-semibold">865 IT Jobs for Đỗ Duy Tuấn</div>
      <div className="flex flex-grow max-w-2xl bg-white text-black rounded">
        <Input
          className="flex-grow"
          placeholder="Enter keyword skill (Java, iOS...), job title, company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button
          type="primary"
          className="rounded-none rounded-r bg-red-500"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        />
      </div>
      <div className="flex space-x-2">
        {/* Example suggestion tags */}
        <span className="bg-gray-700 px-4 py-1 rounded-full cursor-pointer hover:bg-gray-600">
          Java
        </span>
        <span className="bg-gray-700 px-4 py-1 rounded-full cursor-pointer hover:bg-gray-600">
          Spring
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
