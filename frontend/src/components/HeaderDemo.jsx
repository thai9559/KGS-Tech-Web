import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const { Option } = Select;

const HeaderDemo = ({ home, company, business, blog }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const storedLanguage = localStorage.getItem("language") || "vi";
  const [language, setLanguage] = useState(storedLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false); // Track scroll state

  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Handle scroll event to change header background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      await i18n.changeLanguage(language);
      setLoading(false);
    };
    loadLanguage();
  }, [language, i18n]);

  const isActive = (path) => location.pathname === path;

  if (loading) {
    return null;
  }

  return (
    <header
  className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 z-50 transition-all duration-300 ${
    menuOpen || scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white opacity-80"
  }`}
>
  {/* Logo */}
  <div className="text-2xl  cursor-pointer font-bold absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none z-50">
    <Link to="/">Logo</Link>
  </div>

  {/* Navigation */}
  <nav
    className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center transform ${
      menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    } transition-all duration-300 ease-in-out z-50 lg:static lg:transform-none lg:translate-y-0 lg:opacity-100 lg:h-auto lg:flex-row lg:bg-transparent`}
  >
    <ul className="flex flex-col lg:flex-row gap-8 cursor-pointer lg:w-auto">
      <li className={`relative hover:text-gray-400 font-medium font-notoSansJP text-base text-center z-50 ${isActive("/") ? "text-black" : ""}`}>
        <Link to="/">{home}</Link>
        {isActive("/") && <span className="w-2 h-2 rounded-full bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>}
      </li>
      <li className={`relative hover:text-gray-400 font-medium font-notoSansJP text-base text-center z-50 ${isActive("/company") ? "text-black" : ""}`}>
        <Link to="/company">{company}</Link>
        {isActive("/company") && <span className="w-2 h-2 rounded-full bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>}
      </li>
      <li className={`relative hover:text-gray-400 font-medium font-notoSansJP text-base text-center z-50 ${isActive("/business") ? "text-black" : ""}`}>
        <Link to="/business">{business}</Link>
        {isActive("/business") && <span className="w-2 h-2 rounded-full bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>}
      </li>
      <li className={`relative hover:text-gray-400 font-medium font-notoSansJP text-base text-center z-50 ${isActive("/blog") ? "text-black" : ""}`}>
        <Link to="/blog">{blog}</Link>
        {isActive("/blog") && <span className="w-2 h-2 rounded-full bg-primary absolute bottom-[-40%] left-1/2 transform -translate-x-1/2"></span>}
      </li>
    </ul>
  </nav>

  {/* Language Selector */}
  <div className="items-center gap-4 z-50 lg:absolute lg:right-4 lg:top-1/2 lg:transform lg:-translate-y-1/2">
    <Select
      value={language}
      onChange={handleLanguageChange}
      className="text-black bg-transparent focus:outline-none shadow-none border-none p-0"
      bordered={false}
      dropdownStyle={{ background: "#f9fafb" }}
      style={{ width: 110, padding: 0, boxShadow: "none", border: "none" }}
    >
      <Option value="vi">Tiếng Việt</Option>
      <Option value="en">English</Option>
      <Option value="ja">日本語</Option>
    </Select>
  </div>

  {/* Menu toggle for mobile */}
  <div className="lg:hidden z-50">
    <button onClick={toggleMenu} className="text-2xl focus:outline-none relative" aria-label="Toggle menu">
      {menuOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
        </svg>
      )}
    </button>
  </div>
</header>

  );
};

export default HeaderDemo;
