import React from "react";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

const VideoBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[100vh] md:h-[808px] overflow-hidden">
      {/* Video */}
      <ReactPlayer
        url="https://youtu.be/L5Jk1Koi3Kg?si=mJRFWehR6Hneg95i"
        className="absolute top-0 left-0 w-full h-[90vh] z-0 object-cover object-top"
        playing={true}
        muted={true}
        loop={true}
        width="100%"
        height="100%"
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              controls: 0,
              showinfo: 0,
            },
          },
        }}
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center z-10">
        <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
          {t("banner.title")}
        </h2>
        <p className="text-white text-lg md:text-xl mt-4 text-center">
          {t("banner.slogan")}
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200">
          {t("banner.description")}
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;
