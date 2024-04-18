import {BiLogoFacebook, BiLogoLinkedin, BiLogoYoutube} from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            {/* <img src="/path-to-your-logo.png" alt="Logo" className="mb-3" /> */}
            <h2>Recruit Me</h2>
            <p className="text-red-600 mb-3">Little But Quality</p>
            <div className="flex space-x-4 mb-3">
              <a
                className="text-white"
                href="https://facebook.com"
                aria-label="Facebook"
              >
                <BiLogoFacebook />
              </a>
              <a
                className="text-white"
                href="https://linkedin.com"
                aria-label="LinkedIn"
              >
                <BiLogoLinkedin />
              </a>
              <a
                className="text-white"
                href="https://youtube.com"
                aria-label="YouTube"
              >
                <BiLogoYoutube />
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-2">About Us</h5>
            <ul>
              <li>
                <a className="text-white" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  AI Match Service
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  All Jobs
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Campaign</h5>
            <ul>
              <li>
                <a className="text-white" href="#">
                  IT Story
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Writing Contest
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Terms & Conditions</h5>
            <ul>
              <li>
                <a className="text-white" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Operating Regulation
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Complaint Handling
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a className="text-white" href="#">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 md:flex justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-white hover:text-gray-300  text-sm">
              Link to some page
            </a>
          </div>
          <div>
            <p className="text-sm">Copyright © Recruit Me</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
