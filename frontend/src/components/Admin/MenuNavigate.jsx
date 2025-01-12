import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { FaChevronDown, FaBars } from "react-icons/fa"; // Dùng icon mới từ react-icons

const MenuNavigate = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [collapsed, setCollapsed] = useState(false); // Để theo dõi trạng thái mở/đóng của menu
  const [isMobile, setIsMobile] = useState(false); // Để kiểm tra xem màn hình có phải là mobile không

  const handleOpenChange = (key) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const toggleMenu = () => {
    if (isMobile) {
      setCollapsed(!collapsed); // Chỉ toggle ở chế độ mobile
    }
  };

  // Dùng useEffect để theo dõi thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Kiểm tra xem màn hình có phải mobile hay không
    };

    // Kiểm tra khi lần đầu render
    handleResize();

    // Lắng nghe sự kiện thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Nút toggle menu cho mobile */}
      <div className="lg:hidden p-4">
        <button onClick={toggleMenu} className="text-black">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar (Menu dọc) */}
      <div
        className={`w-64 bg-blue-500 text-white transition-all ${
          isMobile && collapsed ? "w-0" : "w-64"
        }`}
      >
        <div className="p-4 font-semibold text-xl text-center">Quản lý</div>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center px-4 py-2 hover:bg-blue-700"
            >
              <HomeOutlined className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/company"
              className="flex items-center px-4 py-2 hover:bg-blue-700"
            >
              <FileTextOutlined className="mr-2" />
              Quản lý thông tin công ty
            </Link>
          </li>

          {/* Menu Quản lý tài khoản */}
          <li>
            <div
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-700"
              onClick={() => handleOpenChange("account")}
            >
              <UserOutlined className="mr-2" />
              Quản lý tài khoản
              <FaChevronDown
                className={`ml-auto transition-transform ${
                  openKeys.includes("account") ? "rotate-180" : ""
                }`}
              />
            </div>
            {openKeys.includes("account") && (
              <ul className="pl-8 space-y-2">
                <li>
                  <Link
                    to="/admin/users"
                    className="flex items-center px-4 py-2 hover:bg-blue-600"
                  >
                    Người dùng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/roles"
                    className="flex items-center px-4 py-2 hover:bg-blue-600"
                  >
                    Vai trò
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Menu Quản lý Blog */}
          <li>
            <div
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-700"
              onClick={() => handleOpenChange("blog")}
            >
              <AppstoreAddOutlined className="mr-2" />
              Quản lý Blog
              <FaChevronDown
                className={`ml-auto transition-transform ${
                  openKeys.includes("blog") ? "rotate-180" : ""
                }`}
              />
            </div>
            {openKeys.includes("blog") && (
              <ul className="pl-8 space-y-2">
                <li>
                  <Link
                    to="/admin/blog-posts"
                    className="flex items-center px-4 py-2 hover:bg-blue-600"
                  >
                    Bài viết
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categories"
                    className="flex items-center px-4 py-2 hover:bg-blue-600"
                  >
                    Danh mục
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Menu Quản lý Cài đặt */}
          <li>
            <div
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-700"
              onClick={() => handleOpenChange("settings")}
            >
              <SettingOutlined className="mr-2" />
              Cài đặt
              <FaChevronDown
                className={`ml-auto transition-transform ${
                  openKeys.includes("settings") ? "rotate-180" : ""
                }`}
              />
            </div>
            {openKeys.includes("settings") && (
              <ul className="pl-8 space-y-2">
                <li>
                  <Link
                    to="/admin/general-settings"
                    className="flex items-center px-4 py-2 hover:bg-blue-600"
                  >
                    Cài đặt chung
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/branch-settings"
                    className="flex items-center px-4 py-2 hover:bg-blue-600"
                  >
                    Cài đặt chi nhánh
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Các menu khác */}
          <li>
            <Link
              to="/admin/team"
              className="flex items-center px-4 py-2 hover:bg-blue-700"
            >
              <TeamOutlined className="mr-2" />
              Quản lý đội ngũ
            </Link>
          </li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Render nội dung của các route con */}
        <Outlet />
      </div>
    </div>
  );
};

export default MenuNavigate;
