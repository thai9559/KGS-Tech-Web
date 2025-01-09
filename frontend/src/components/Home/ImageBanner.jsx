import React from "react";
import { useTranslation } from "react-i18next"; // Thư viện i18n để dịch ngôn ngữ

const ImageBanner = () => {
  // Định nghĩa các link ảnh tương ứng với ngôn ngữ
  const imageLinks = {
    vi: "https://res.cloudinary.com/dtnuj2les/image/upload/v1736426853/vi_jyaosa.png",
    en: "https://res.cloudinary.com/dtnuj2les/image/upload/v1736426852/en_2_jk4q5a.png",
    ja: "https://res.cloudinary.com/dtnuj2les/image/upload/v1736426852/ja_xgljv1.png",
  };

  // Lấy ngôn ngữ từ localStorage
  const language = localStorage.getItem("language") || "en";

  // Xác định link ảnh dựa vào ngôn ngữ
  const imageUrl = imageLinks[language] || imageLinks.en;

  // Hook dịch ngôn ngữ
  const { t } = useTranslation();

  // Nội dung các phần dưới ảnh
  const sections = [
    {
      title: t("imageBanner.title1"),
      description: t("imageBanner.description1"),
    },
    {
      title: t("imageBanner.title2"),
      description: t("imageBanner.description2"),
    },
    {
      title: t("imageBanner.title3"),
      description: t("imageBanner.description3"),
    },
    {
      title: t("imageBanner.title4"),
      description: t("imageBanner.description4"),
    },
  ];

  return (
    <div className="w-full">
      {/* Hiển thị ảnh */}
      <div className="w-full h-auto flex justify-center items-center p-4">
        <img
          src={imageUrl}
          alt={`Image for ${language}`}
          className="max-w-full h-auto object-contain"
        />
      </div>

      {/* Hiển thị các phần mô tả dưới ảnh */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="w-full max-w-md mx-auto border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-orange-700 mb-2">
              {section.title}
            </h3>
            <p className="text-sm text-gray-700">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageBanner;
