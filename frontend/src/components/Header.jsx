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
    <header className="flex justify-between items-center p-4 bg-white border-b-2 text-black relative">
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none z-50 relative"
        >
          {menuOpen ? '✖' : '☰'} 
        </button>
      </div>

      <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
        Logo
      </div>

      <nav
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 flex flex-col items-center justify-center transform ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } transition-all duration-300 ease-in-out z-40 lg:static lg:transform-none lg:translate-y-0 lg:opacity-100 lg:h-auto lg:flex-row lg:bg-white`}
      >
        <ul className="flex flex-col lg:flex-row gap-8 cursor-pointer text-white lg:text-black w-full lg:w-auto">
          <li className="hover:text-gray-400 text-center">{home}</li>
          <li className="hover:text-gray-400 text-center">{company}</li>
          <li className="hover:text-gray-400 text-center">{business}</li>
          <li className="hover:text-gray-400 text-center">{blog}</li>
        </ul>
      </nav>

      <div className="hidden lg:flex items-center gap-4">
      <Select
          defaultValue="vi"
          onChange={handleLanguageChange}
          className="text-black bg-transparent focus:outline-none shadow-none border-none p-0"
          bordered={false} // Loại bỏ border của Select
          dropdownStyle={{
            background: '#f9fafb',
          }} // Thay đổi màu nền của dropdown
          style={{
            width:110,
            padding: 0,
            boxShadow: 'none',
            border: 'none',
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
