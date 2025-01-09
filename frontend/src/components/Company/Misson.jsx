import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import thêm useNavigate

const Mission = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Sử dụng navigate để điều hướng

  const handleButtonClick = () => {
    navigate("/business#contact"); // Chuyển đến trang business và cuộn đến phần contact
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white relative">
      <div
        className="absolute inset-0 bg-cover bg-left opacity-30"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dtnuj2les/image/upload/v1736131926/arrow-pointing-forward_xbmgjt.jpg')",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
          {t("mission.title")}
        </h2>
        <p className="text-base md:text-lg font-notoSansJP max-w-2xl mx-auto mb-10 text-shadow-lg">
          {t("mission.description")}
        </p>

        {/* Call to action button */}
        <button
          onClick={handleButtonClick}
          className="inline-block py-3 px-8 font-notoSansJP bg-yellow-500 text-blue-900 font-semibold rounded-full hover:bg-yellow-400 transition duration-300"
        >
          {t("mission.contact")}
        </button>
      </div>
    </section>
  );
};

export default Mission;
