import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Animation from "./Animation";
import { FaPlay, FaPause } from "react-icons/fa"; // Icons cho Play và Pause

const VideoBanner = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null); // Ref cho video
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái video

  const handlePlayPauseVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); // Tạm dừng video
        setIsPlaying(false); // Cập nhật trạng thái
      } else {
        videoRef.current.play(); // Phát video
        setIsPlaying(true); // Cập nhật trạng thái
      }
    }
  };

  return (
    <div className="relative w-full h-screen p-2">
      {/* Wrapper div with border and rounded corners */}
      <div className="w-full h-full border rounded-md overflow-hidden relative">
        {/* Video */}
        <video
          ref={videoRef}
          src="/video1.mp4" // Đường dẫn video
          className="absolute top-0 left-0 w-full h-full object-cover"
          muted
          loop
          playsInline
        />

        {/* Overlay */}
        {!isPlaying && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-start pl-10 lg:pl-16 z-10">
            {/* Title */}
            <Animation>
              <h2 className="text-white text-4xl md:text-6xl font-bold">
                Transform Your Business <br /> with Cutting-Edge IT Solutions
              </h2>

              {/* Additional Text */}
              <p className="text-white text-lg md:text-xl mt-4 max-w-lg">
                Empower your business with innovative IT services designed to
                drive growth, enhance productivity, and streamline operations.
                From cloud computing to cybersecurity, we deliver tailored
                solutions that meet your unique needs and challenges.
              </p>
            </Animation>
            <Animation>
              <button className="mt-6 px-6 py-3 bg-white text-black font-bold rounded-lg border border-black focus:outline focus:outline-2 focus:outline-black hover:bg-gray-100">
                <Link to="business/#services">{t("banner.description")}</Link>
              </button>
            </Animation>
          </div>
        )}

        {/* Play/Pause Button */}
        <button
          className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-transparent text-white border border-white rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline focus:outline-2 focus:outline-white z-20"
          onClick={handlePlayPauseVideo}
        >
          {isPlaying ? (
            <>
              <FaPause className="text-white" /> {/* Icon tạm dừng */}
              <span>Pause Video</span>
            </>
          ) : (
            <>
              <FaPlay className="text-white" /> {/* Icon phát video */}
              <span>Play Video</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;

// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import Animation from "./Animation";
// import ReactPlayer from "react-player"; // Import react-player
// import { FaPlay } from "react-icons/fa"; // Icon phát video

// const VideoBanner = () => {
//   const { t } = useTranslation();
//   const [isPlaying, setIsPlaying] = useState(false); // Trạng thái video

//   const handlePlayVideo = () => {
//     setIsPlaying(true); // Cập nhật trạng thái khi video được phát
//   };

//   return (
//     <div className="relative w-full h-screen p-2">
//       {/* Wrapper div with border and rounded corners */}
//       <div className="w-full h-full border rounded-md overflow-hidden relative">
//         {/* React Player for Video */}
//         <ReactPlayer
//           url="https://youtu.be/yrGBH6ICN2w?si=W_hZ69FYiL8EBgNd"
//           playing={isPlaying}
//           muted
//           loop
//           width="100%"
//           height="100%"
//           className="absolute top-0 left-0"
//         />

//         {/* Overlay */}
//         <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center z-10">
//           {/* Title */}
//           <Animation>
//             <h2 className="text-white text-4xl md:text-6xl font-bold text-center hidden sm:block">
//               {t("banner.title")}
//             </h2>

//             {/* Slogan */}
//             <p className="text-white text-lg md:text-xl mt-4 text-center hidden sm:block">
//               {t("banner.slogan")}
//             </p>
//           </Animation>
//           <Animation>
//             <button className="mt-6 px-6 py-3 hidden sm:block bg-transparent text-white font-semibold rounded-lg border border-white focus:outline focus:outline-2 focus:outline-white hover:bg-white hover:bg-opacity-10">
//               <Link to="business/#services">{t("banner.description")}</Link>
//             </button>
//           </Animation>
//         </div>

//         {/* Play Button */}
//         {!isPlaying && (
//           <button
//             className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-transparent text-white border border-white rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline focus:outline-2 focus:outline-white z-20"
//             onClick={handlePlayVideo}
//           >
//             <FaPlay className="text-white" /> {/* Icon phát video */}
//             <span>Play Video</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoBanner;
