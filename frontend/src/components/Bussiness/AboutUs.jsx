import React from "react";
import { FaDesktop, FaMobileAlt, FaGlobe } from "react-icons/fa"; // Import các icon
import { useTranslation } from "react-i18next"; // Import useTranslation từ react-i18next

function AboutUs({ image }) {
  const { t } = useTranslation(); // Sử dụng hook useTranslation để lấy các chuỗi ngôn ngữ

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6">
        {/* Phần text */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold font-notoSansJP text-gray-800">
            {t("BusinessPage.aboutUs.title")}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t("BusinessPage.aboutUs.description")}
          </p>
          {/* Điểm nhấn */}
          <p className="text-md text-blue-600 font-semibold">
            {t("BusinessPage.aboutUs.slogan")}
          </p>
          {/* Nút CTA */}
          <div className="space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
              {t("BusinessPage.aboutUs.learnMore")}
            </button>
            <button className="px-6 py-3 bg-transparent border border-blue-600 text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-600 hover:text-white">
              {t("BusinessPage.aboutUs.contactUs")}
            </button>
          </div>
        </div>

        {/* Phần ảnh */}
        <div className="relative">
          <img
            src={image || "https://via.placeholder.com/500"}
            alt="About Us Illustration"
            className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          {/* Text nổi bật trên hình ảnh */}
          <div className="absolute top-0 left-0 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-tr-lg rounded-bl-lg">
            {t("BusinessPage.aboutUs.trustBy")}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
