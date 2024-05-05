import {useState} from "react";
import {Transition} from "@headlessui/react";
import {BellIcon, ChevronDownIcon, UserIcon} from "@heroicons/react/20/solid";
import {HiMenuAlt3} from "react-icons/hi";
import {AiOutlineClose} from "react-icons/ai";
import {Link} from "react-router-dom";
import CustomButton from "./CustomButton";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("auth"))?.userName;
  const accessToken = localStorage.getItem("accessToken");
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <>
      <div className="relative bg-custom-gradient z-50">
        <nav className="container mx-auto flex items-center justify-between p-5">
          <div>
            <Link to="/" className="text-white font-bold text-xl">
              <span className="text-[#fff]">Recruit Me</span>
            </Link>
          </div>

          <ul className="hidden lg:flex gap-10 text-base text-white font-semibold">
            <li>
              <Link className="text-white" to="/">
                All Job
              </Link>
            </li>
            <li>
              <Link className="text-white" to="/companies">
                Companies
              </Link>
            </li>
            <li>
              <Link className="text-white" to="/about-us">
                About
              </Link>
            </li>
          </ul>

          <div className="flex justify-center content-center gap-4 flex-wrap">
            <div
              onClick={() => {
                window.open(
                  "http://localhost:5001/",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="font-semibold text-white text-base text-center mt-[6px] cursor-pointer"
            >
              For Employers
            </div>
            {!accessToken ? (
              <Link
                to="/login"
                className="text-white flex items-center font-semibold text-base mt-[6px]"
              >
                Sign In
              </Link>
            ) : (
              <div>
                <div className="flex items-center space-x-4 mt-1 text-white font-semibold text-lg">
                  <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  <div className="relative">
                    <button
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                      className="flex items-center text-gray-500 hover:text-gray-700 cursor-pointer bg-transparent border-none"
                    >
                      <UserIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      <ChevronDownIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
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
                            onClick={() => {
                              navigate("/profile");
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profile
                          </a>
                          <a
                            // onClick={handleLogOut}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Applies
                          </a>
                          <a
                            onClick={handleLogOut}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </a>
                        </div>
                      </div>
                    </Transition>
                  </div>
                  {userName ?? <div className="text-white">{userName}</div>}
                </div>
              </div>
            )}
          </div>

          <button
            className="block lg:hidden text-slate-900"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
