import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

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
const FaHeadset = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaHeadset }))
);
const FaLightbulb = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaLightbulb }))
);

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
    <>
      <Helmet>
        <title>{"KGS Tech"}</title>
        <meta name="description" content={t("seo.benefits.description")} />
        <meta property="og:title" content={t("benefits.page_title")} />
        <meta
          property="og:description"
          content={t("seo.benefits.description")}
        />
        <meta
          property="og:image"
          content="https://example.com/benefits-image.jpg" // Thay thế bằng hình ảnh đại diện
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden gap-4 p-6 mt-10">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="relative p-8  bg-primary rounded-lg border text-center text-white shadow-2xl overflow-hidden group transition-all duration-500 h-[240px]"
            >
              {/* Giao diện mobile (iPad trở xuống) */}
              <div className="flex flex-col items-center lg:hidden">
                {benefit.icon}
                <h2 className="text-lg font-bold mt-2">{benefit.title}</h2>
                <p className="text-base mt-2">{benefit.description}</p>
              </div>
              {/* Giao diện desktop (từ 1024px trở lên) */}
              <div className="hidden lg:flex flex-col  items-center group h-[250px]">
                <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-700 ease-in-out opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100%]">
                  {benefit.icon}
                  <h2 className="text-xl font-bold">{benefit.title}</h2>
                </div>
                <div className="absolute inset-0 p-10 justify-center z-30 bg-white transform translate-y-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                  <p className="text-black text-base text-left">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default Benefits;
