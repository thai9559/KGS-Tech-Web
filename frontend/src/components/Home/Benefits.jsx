import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Animation from "../Animation";

const FaMicrochip = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaMicrochip }))
);
const FaUsers = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaUsers }))
);
const FaCogs = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaCogs }))
);
const FaSeedling = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaSeedling }))
);

const Benefits = ({ titles, descriptions, imageUrl }) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{"KGS Tech"}</title>
        <meta name="description" content={t("seo.benefits.description")} />
        <meta property="og:title" content={t("benefits.page_title")} />
        <meta
          property="og:description"
          content={t("seo.benefits.description")}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 mt-10">
          {titles.map((title, index) => (
            <Animation key={index} animationType="fade-up">
              <div
                className="relative bg-cover bg-center rounded-lg overflow-hidden group"
                style={{
                  backgroundImage: `url(${imageUrl})`, // Sử dụng ảnh được truyền vào props
                }}
              >
                {/* Ảnh nền và các div chứa thông tin */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-6">
                  <div className="text-center text-white">
                    <h2 className="text-2xl font-bold font-notoSansJP mb-2">
                      {title}
                    </h2>
                    <p className="text-base font-notoSansJP">{descriptions[index]}</p>
                  </div>
                </div>
              </div>
            </Animation>
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default Benefits;
