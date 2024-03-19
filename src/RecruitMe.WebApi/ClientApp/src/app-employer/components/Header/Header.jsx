import {useState} from "react";
import {BellIcon, ChevronDownIcon, UserIcon} from "@heroicons/react/20/solid";
import {Transition} from "@headlessui/react";
import {Header} from "antd/es/layout/layout";

const AppHeader = () => {
  const email = JSON.parse(localStorage.getItem("auth"))?.email;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <Header className="bg-white shadow h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <span className="text-blue-500 font-bold text-2xl">Recruit Me</span>
      </div>
      <div className="flex items-center space-x-4">
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        <div className="relative">
          <button
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className="flex items-center text-gray-500 hover:text-gray-700 cursor-pointer bg-transparent border-none"
          >
            <UserIcon className="h-6 w-6" aria-hidden="true" />
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {/* Dropdown */}
          <Transition
            show={isDropdownOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  onClick={handleLogOut}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          </Transition>
        </div>
        {email ?? <div>{email}</div>}
      </div>
    </Header>
  );
};

export default AppHeader;
