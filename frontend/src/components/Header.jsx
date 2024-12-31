import React, { useState } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Header = ({ home, company, business, blog }) => {
  const { t, i18n } = useTranslation();
  
  const [language, setLanguage] = useState('vi'); // Mặc định là Tiếng Việt
  const [menuOpen, setMenuOpen] = useState(false); // Điều khiển menu mở/đóng
  
  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  // Toggle menu mở/đóng
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative flex justify-between items-center p-4 bg-white border-b-2 text-black">
      {/* Hamburger menu icon hoặc X (chỉ hiển thị trên mobile) */}
      <div className="lg:hidden absolute left-4 top-4">
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? '×' : '☰'} {/* Hiển thị dấu X nếu menu mở, ngược lại hiển thị hamburger */}
        </button>
      </div>

      {/* Logo */}
      <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
        Logo
      </div>

      {/* Danh sách menu */}
      <div className={`lg:flex gap-8 ${menuOpen ? 'block' : 'hidden'} md:flex-col fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 z-50`}>
        <ul className="flex gap-8 cursor-pointer flex-col items-center justify-center h-full text-white">
          <li className="hover:text-gray-400">{home}</li>
          <li className="hover:text-gray-400">{company}</li>
          <li className="hover:text-gray-400">{business}</li>
          <li className="hover:text-gray-400">{blog}</li>
        </ul>
      </div>

      {/* Dropdown chọn ngôn ngữ */}
      <div className="flex items-center gap-4">
        <Select
          defaultValue="vi"
          style={{ width: 120 }}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white"
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
