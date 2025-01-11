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
const FaHeadset = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaHeadset }))
);
const FaLightbulb = lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaLightbulb }))
);
import { FaLaptopCode, FaMobileAlt, FaGlobe } from "react-icons/fa";

const Service = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("BusinessPage.services.webDevelopment.title"),
      description: t("BusinessPage.services.webDevelopment.description"),
      icon: <FaLaptopCode size={40} color="#ffffff" />,
    },
    {
      title: t("BusinessPage.services.smartphoneAppDevelopment.title"),
      description: t(
        "BusinessPage.services.smartphoneAppDevelopment.description"
      ),
      icon: <FaMobileAlt size={40} color="#ffffff" />,
    },
    {
      title: t("BusinessPage.services.websiteDevelopment.title"),
      description: t("BusinessPage.services.websiteDevelopment.description"),
      icon: <FaGlobe size={40} color="#ffffff" />,
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
          content="https://example.com/benefits-image.jpg"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="text-center mt-10">
          <h1 className="text-4xl text-black font-bold">
            {t("BusinessPage.services.title")}
          </h1>
        </div>

        {/* Grid Layout for Mobile and Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 p-6 mt-10">
          {services.map((benefit) => (
            <Animation animationType="fade-up" key={benefit.title}>
              <div className="relative p-8 bg-[#1ea0ff] text-center text-white shadow-2xl overflow-hidden group transition-all duration-500 h-[240px] sm:h-[280px]">
                {/* Mobile interface (iPad and below) */}
                <div className="flex flex-col items-center lg:hidden">
                  {benefit.icon}
                  <h2 className="text-xl font-notoSansJP font-bold mt-2 px-4">
                    {benefit.title}
                  </h2>
                  <p className="text-base font-notoSansJP mt-2 px-4">
                    {benefit.description}
                  </p>
                </div>
                {/* Desktop interface (1024px and above) */}
                <div className="hidden lg:flex flex-col items-center group h-[250px]">
                  <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-700 ease-in-out opacity-100 group-hover:opacity-0 group-hover:translate-y-[-100%]">
                    {benefit.icon}
                    <h2 className="text-2xl font-notoSansJP font-bold">
                      {benefit.title}
                    </h2>
                  </div>
                  <div className="absolute inset-0 p-10 justify-center z-30 bg-white transform translate-y-12 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out">
                    <p className="text-gray700 font-notoSansJP text-base text-left">
                      {benefit.description}
                    </p>
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

export default Service;
