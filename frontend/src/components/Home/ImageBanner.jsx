import React from "react";
import { useTranslation } from "react-i18next"; // Thư viện i18n để dịch ngôn ngữ
import Animation from "../Animation";
const ImageBanner = () => {
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

  // Tiêu đề phía trên ảnh
  const titleAboveImage = language === "ja" ? "事業内容" : language === "vi" ? "Nội dung công việc" : "Business Overview";

  return (
    <div className="w-full">
      {/* Tiêu đề phía trên ảnh */}
      <Animation>
      <div className="w-full text-center p-4">
        <h2 className="text-4xl font-notoSansJP font-bold text-black">{titleAboveImage}</h2>
      </div>

      {/* Hiển thị ảnh */}
    

      <div className="w-full h-auto flex justify-center items-center p-4">
        <img
          src={imageUrl}
          alt={`Image for ${language}`}
          className="max-w-full h-auto object-contain"
        />
      </div>
      </Animation>

 <Animation animationType="zoom-out">
      <div className="flex flex-wrap justify-center p-4">
        {sections.slice(0, 2).map((section, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 max-w-xl mx-auto p-6 bg-white"
          >
            <h3 className="text-2xl font-notoSansJP font-bold text-orange-700 mb-2">
              {section.title}
            </h3>
            <p className="text-base font-notoSansJP font-medium text-gray-700">{section.description}</p>
          </div>
        ))} 

        {/* Centered Icon */}
        <div className="flex justify-center items-center w-full ">
          <img
            src="https://res.cloudinary.com/dtnuj2les/image/upload/v1736474078/10507204_jxpe9n.png"
            alt="Icon"
            className="w-40 h-40 object-contain"  
          />
        </div>

        {sections.slice(2, 4).map((section, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 max-w-xl mx-auto p-6 bg-white"
          >
            <h3 className="text-2xl font-notoSansJP font-bold text-orange-700 mb-2">
              {section.title}
            </h3>
            <p className="text-base font-notoSansJP font-medium text-gray-700">{section.description}</p>
          </div>
        ))}
      </div>
      </Animation>
    </div>
  );
};

export default ImageBanner;
