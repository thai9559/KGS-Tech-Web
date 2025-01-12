import React from "react";
import { useTranslation } from "react-i18next";
import video from "/video.mp4";
import { Link } from "react-router-dom";
import Animation from "./Animation";
const VideoBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video */}
      <video
        src={video}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center z-10">
        {/* Tiêu đề */}
        <Animation>
          <h2 className="text-white text-4xl md:text-6xl font-bold text-center hidden sm:block">
            {t("banner.title")}
          </h2>

          {/* Slogan */}
          <p className="text-white text-lg md:text-xl mt-4 text-center hidden sm:block">
            {t("banner.slogan")}
          </p>
        </Animation>
        <Animation>
          <button className="mt-6 px-6 py-3 hidden sm:block bg-transparent text-white font-semibold rounded-lg border border-white focus:outline focus:outline-2 focus:outline-white hover:bg-white hover:bg-opacity-10">
            <Link to="business/#services">{t("banner.description")}</Link>
          </button>
        </Animation>
      </div>
    </div>
  );
};

export default VideoBanner;
