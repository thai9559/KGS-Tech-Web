// import React, { useState, useEffect } from "react";
// import { Select } from "antd";
// import { useTranslation } from "react-i18next";
// import { Link, useLocation } from "react-router-dom";

// const { Option } = Select;

// const Header = ({ home, company, business, blog }) => {
//   const { t, i18n } = useTranslation();
//   const location = useLocation();

//   const storedLanguage = localStorage.getItem("language") || "vi";
//   const [language, setLanguage] = useState(storedLanguage);
//   const [loading, setLoading] = useState(true); // Thêm trạng thái loading

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false); // Thêm state để kiểm tra cuộn trang

//   const handleLanguageChange = (value) => {
//     setLanguage(value);
//     i18n.changeLanguage(value);
//     localStorage.setItem("language", value);
//   };

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   // Kiểm tra khi cuộn trang
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true); // Khi cuộn xuống > 50px, đổi màu header
//       } else {
//         setIsScrolled(false); // Khi lên đầu trang, trở lại màu gốc
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const loadLanguage = async () => {
//       await i18n.changeLanguage(language); // Đợi ngôn ngữ được load
//       setLoading(false); // Sau khi load xong thì tắt trạng thái loading
//     };
//     loadLanguage();
//   }, [language, i18n]);

//   const isActive = (path) => location.pathname === path;

//   if (loading) {
//     return null; // Tạm thời không render gì khi đang load
//   }

//   return (
//     <header
//       className={`flex justify-between items-center p-4 text-black border-b-2 sticky top-0 z-50 transition-all duration-300 ease-in-out ${
//         isScrolled ? "bg-white" : "bg-transparent"
//       }`} // Đảm bảo nền trong suốt khi chưa cuộn
//     >
//       <div className="lg:hidden">
//         <button
//           onClick={toggleMenu}
//           className="text-2xl focus:outline-none z-99 relative"
//         >
//           {menuOpen ? "✖" : "☰"}
//         </button>
//       </div>

//       <div className="text-2xl cursor-pointer font-bold absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
//         <Link to="/">Logo</Link>
//       </div>

//       <nav
//         className={`fixed top-0 left-0 w-full h-full  bg-gray-800 flex flex-col items-center justify-center transform ${
//           menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
//         } transition-all duration-300 ease-in-out z-50 lg:static lg:transform-none lg:translate-y-0 lg:opacity-100 lg:h-auto lg:flex-row lg:bg-white`}
//       >
//         <ul className="flex flex-col lg:flex-row gap-8 cursor-pointer text-white lg:text-black w-full lg:w-auto">
//           <li
//             className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
//               isActive("/") ? "text-primary" : ""
//             }`}
//           >
//             <Link to="/">{home}</Link>
//             {isActive("/") && (
//               <span className="w-2 h-2 rounded-full  bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
//             )}
//           </li>
//           <li
//             className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
//               isActive("/company") ? "text-primary" : ""
//             }`}
//           >
//             <Link to="/company">{company}</Link>
//             {isActive("/company") && (
//               <span className="w-2 h-2 rounded-full  bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
//             )}
//           </li>
//           <li
//             className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
//               isActive("/business") ? "text-primary" : ""
//             }`}
//           >
//             <Link to="/business">{business}</Link>
//             {isActive("/business") && (
//               <span className="w-2 h-2 rounded-full  bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
//             )}
//           </li>
//           <li
//             className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
//               isActive("/blog") ? "text-primary" : ""
//             }`}
//           >
//             <Link to="/blog">{blog}</Link>
//             {isActive("/blog") && (
//               <span className="w-2 h-2 rounded-full bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
//             )}
//           </li>
//         </ul>
//       </nav>
//       <div className="items-center gap-4">
//         <Select
//           value={language}
//           onChange={handleLanguageChange}
//           className="text-black bg-transparent focus:outline-none shadow-none border-none p-0"
//           bordered={false}
//           dropdownStyle={{
//             background: "#f9fafb",
//           }}
//           style={{
//             width: 110,
//             padding: 0,
//             boxShadow: "none",
//             border: "none",
//           }}
//         >
//           <Option value="vi">Tiếng Việt</Option>
//           <Option value="en">English</Option>
//           <Option value="ja">日本語</Option>
//         </Select>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const { Option } = Select;

const Header = ({ home, company, business, blog }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const storedLanguage = localStorage.getItem("language") || "vi";
  const [language, setLanguage] = useState(storedLanguage);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const loadLanguage = async () => {
      await i18n.changeLanguage(language); // Đợi ngôn ngữ được load
      setLoading(false); // Sau khi load xong thì tắt trạng thái loading
    };
    loadLanguage();
  }, [language, i18n]);

  const isActive = (path) => location.pathname === path;

  if (loading) {
    return null; // Tạm thời không render gì khi đang load
  }

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b-2 text-black sticky top-0 z-50">
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none z-99 relative"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      <div className="text-2xl cursor-pointer font-bold absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
        <Link to="/">Logo</Link>
      </div>

      <nav
        className={`fixed top-0 left-0 w-full h-full  bg-gray-800 flex flex-col items-center justify-center transform ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } transition-all duration-300 ease-in-out z-50 lg:static lg:transform-none lg:translate-y-0 lg:opacity-100 lg:h-auto lg:flex-row lg:bg-white`}
      >
        <ul className="flex flex-col lg:flex-row gap-8 cursor-pointer text-white lg:text-black w-full lg:w-auto">
          <li
            className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
              isActive("/") ? "text-primary" : ""
            }`}
          >
            <Link to="/">{home}</Link>
            {isActive("/") && (
              <span className="w-2 h-2 rounded-full  bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
            )}
          </li>
          <li
            className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
              isActive("/company") ? "text-primary" : ""
            }`}
          >
            <Link to="/company">{company}</Link>
            {isActive("/company") && (
              <span className="w-2 h-2 rounded-full  bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
            )}
          </li>
          <li
            className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
              isActive("/business") ? "text-primary" : ""
            }`}
          >
            <Link to="/business">{business}</Link>
            {isActive("/business") && (
              <span className="w-2 h-2 rounded-full  bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
            )}
          </li>
          <li
            className={`relative hover:text-gray-400 font-medium text-base font-beVietnam text-center ${
              isActive("/blog") ? "text-primary" : ""
            }`}
          >
            <Link to="/blog">{blog}</Link>
            {isActive("/blog") && (
              <span className="w-2 h-2 rounded-full bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>
            )}
          </li>
        </ul>
      </nav>
      <div className="items-center gap-4">
        <Select
          value={language}
          onChange={handleLanguageChange}
          className="text-black bg-transparent focus:outline-none shadow-none border-none p-0"
          bordered={false}
          dropdownStyle={{
            background: "#f9fafb",
          }}
          style={{
            width: 110,
            padding: 0,
            boxShadow: "none",
            border: "none",
          }}
        >
          <Option value="vi">Tiếng Việt</Option>
          <Option value="en">English</Option>
          <Option value="ja">日本語</Option>
        </Select>
      </div>
    </header>
  );
};

export default Header;
