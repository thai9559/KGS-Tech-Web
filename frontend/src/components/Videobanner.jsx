import React from "react";
import ReactPlayer from "react-player";

const VideoBanner = () => {
  return (
    <div className="relative w-full h-[100vh] md:h-[117vh] overflow-hidden">
      {/* Video */}

      <ReactPlayer
        url="https://youtu.be/3rtYoSighWI?si=8__D_21iPeFpyTOa"
        className="absolute top-0 left-0 w-full h-full z-0 object-cover object-top"
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
          Welcome to Our World
        </h2>
        <p className="text-white text-lg md:text-xl mt-4 text-center">
          Discover endless possibilities with our services.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;
