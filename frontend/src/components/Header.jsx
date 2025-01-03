import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { Option } = Select;

const Header = ({ home, company, business, blog }) => {
  const { t, i18n } = useTranslation();

  // Lấy ngôn ngữ từ localStorage hoặc mặc định là "vi"
  const storedLanguage = localStorage.getItem("language") || "vi";
  const [language, setLanguage] = useState(storedLanguage);

  const [menuOpen, setMenuOpen] = useState(false); // Điều khiển menu mở/đóng

  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);

    // Lưu ngôn ngữ vào localStorage
    localStorage.setItem("language", value); // Lưu ngôn ngữ vào localStorage
  };

  // Toggle menu mở/đóng
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b-2 text-black sticky top-0 z-50">
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none z-999 relative"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      <div className="text-2xl cursor-pointer font-bold absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
      <Link to="/">Logo</Link>
      </div>

      <nav
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 flex flex-col items-center justify-center transform ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } transition-all duration-300 ease-in-out z-40 lg:static lg:transform-none lg:translate-y-0 lg:opacity-100 lg:h-auto lg:flex-row lg:bg-white`}
      >
        <ul className="flex flex-col lg:flex-row gap-8 cursor-pointer text-white lg:text-black w-full lg:w-auto">
          <li className="hover:text-gray-400 font-medium text-lg font-beVietnam text-center">
            <Link to="/">{home}</Link>
          </li>
          <li className="hover:text-gray-400 font-medium text-lg font-beVietnam text-center">
            <Link to="/company">{company}</Link>
          </li>
          <li className="hover:text-gray-400 font-medium text-lg font-beVietnam text-center">
            <Link to="/business">{business}</Link>
          </li>
          <li className="hover:text-gray-400 font-medium text-lg font-beVietnam text-center">
            <Link to="/blog">{blog}</Link>
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
