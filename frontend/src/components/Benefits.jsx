import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaMicrochip,
  FaUsers,
  FaCogs,
  FaSeedling,
  FaHeadset,
  FaLightbulb,
} from "react-icons/fa";

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t("benefits.technology"),
      description: t("benefits.technology_description"),
      icon: <FaMicrochip className="text-white text-3xl mb-2" />,
    },
    {
      title: t("benefits.professional_team"),
      description: t("benefits.professional_team_description"),
      icon: <FaUsers className="text-white text-3xl mb-2" />,
    },
    {
      title: t("benefits.custom_solutions"),
      description: t("benefits.custom_solutions_description"),
      icon: <FaCogs className="text-white text-3xl mb-2" />,
    },
    {
      title: t("benefits.sustainable_growth"),
      description: t("benefits.sustainable_growth_description"),
      icon: <FaSeedling className="text-white text-3xl mb-2" />,
    },
    {
      title: t("benefits.customer_service"),
      description: t("benefits.customer_service_description"),
      icon: <FaHeadset className="text-white text-3xl mb-2" />,
    },
    {
      title: t("benefits.strategic_advice"),
      description: t("benefits.strategic_advice_description"),
      icon: <FaLightbulb className="text-white text-3xl mb-2" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-10">
      {benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="relative p-8 bg-[#1ea0ff] text-center text-white shadow-2xl overflow-hidden group transition-all duration-700 h-[240px]" // Giảm chiều cao từ 250px xuống 220px
        >
          {/* Lớp phủ chuyển màu nền từ top xuống khi hover */}
          <div className="absolute inset-0 bg-[#E5D9F2] transform scale-y-0 group-hover:scale-y-100 transition-all duration-700 origin-top z-0"></div>{" "}
          {/* Tăng duration ở đây */}
          {/* Nội dung - icon và title */}
          <div className=" w-[320px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            {/* Thêm icon màu trắng */}
            {benefit.icon}
            {/* Tiêu đề */}
            <h2 className="text-2xl w-full font-bold">{benefit.title}</h2>
          </div>
          {/* Mô tả hiển thị khi hover, che khuất icon và title */}
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out bg-white p-4">
            <p className="text-black text-left text-2xl">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
