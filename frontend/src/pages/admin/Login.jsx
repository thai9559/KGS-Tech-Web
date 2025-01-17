import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { Input, Button, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation(); // Hook for login mutation
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "vi"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = t("login.requireUS");
      valid = false;
    }

    if (!form.password) {
      newErrors.password = t("login.requirePW");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    console.log(form);
    try {
      // Gọi API đăng nhập qua hook `useLoginMutation`
      const response = await login(form).unwrap(); // Unwrap để lấy dữ liệu từ phản hồi
      const { access_token, user } = response;

      // Lưu token vào localStorage
      localStorage.setItem("access_token", access_token);

      // Hiển thị thông báo thành công và điều hướng

      navigate("/admin/dashboard");
    } catch (error) {
      // Xử lý lỗi nếu đăng nhập thất bại
      console.error("Error during login:", error);
      message.error(error.data?.message || t("login.invalid"));
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem("lang", value);
    i18n.changeLanguage(value);
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtnuj2les/image/upload/v1736683356/elegant-cozy-office-with-laptop-min_gmvp3p.jpg')",
      }}
    >
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <Select
          value={language}
          style={{ width: 120 }}
          onChange={handleLanguageChange}
          className="bg-white shadow-sm rounded"
        >
          <Option value="vi">Tiếng Việt</Option>
          <Option value="en">English</Option>
          <Option value="ja">日本語</Option>
        </Select>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white p-8 sm:p-10 md:p-12 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 text-gray-800">
            {t("login.login")}
          </h1>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              {t("login.email")}
            </label>
            <Input
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder={t("login.requireUS")}
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-5 py-3 w-full`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              {t("login.password")}
            </label>
            <Input.Password
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder={t("login.requirePW")}
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-5 py-3 w-full`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="primary"
            block
            onClick={handleSubmit}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg"
          >
            {t("login.login")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
