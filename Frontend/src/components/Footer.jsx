const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 p-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:px-4">
        {/* Logo and Description */}
        <div className="flex-1 mb-8 md:mb-0 md:text-left mr-16">
          <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
            <span className="text-blue-500">⬣</span> ABSENS
          </h3>
          <p className="text-gray-400 max-w-xs transition duration-200 hover:text-white">
            An AI-powered platform to help reunite lost people with their loved
            ones{" "}
            <span role="img" aria-label="flag">
              🚩
            </span>
            .
          </p>
        </div>

        {/* Pages Links */}
        <div className="flex-1 mb-8 md:mb-0 text-left md:text-left">
          <h4 className="text-white font-semibold mb-4">PAGES</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                Report-The-Missing
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                Find-The-Missing
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                About Absens
              </a>
            </li>
          </ul>
        </div>

        {/* Alternatives Links */}
        <div className="flex-1 mb-8 md:mb-0 text-left md:text-left">
          <h4 className="text-white font-semibold mb-4">VISION</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                Contact
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                Support
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                Guidelines
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex-1 mb-8 md:mb-0 text-left md:text-left">
          <h4 className="text-white font-semibold mb-4">SUPPORT</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                Privacy Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white transition duration-200">
                Feedback
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex-1 mb-8 md:mb-0 text-left md:text-left">
          <h4 className="text-white font-semibold mb-4">CONTACT</h4>
          <p className="mb-2 transition duration-200 hover:text-white">
            absens@gmail.com
          </p>
          <div className="flex items-center space-x-2">
            <i className="fab fa-twitter text-gray-400 hover:text-blue-500 transition duration-200"></i>
            <a href="#" className="hover:text-white transition duration-200">
              @absens
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
