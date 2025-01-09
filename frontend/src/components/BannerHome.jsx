import React from "react";

const BannerHome = () => {
  return (
    <div
      className="relative w-full h-[117vh] sm:h-[100vh] overflow-hidden bg-cover bg-top"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtnuj2les/image/upload/v1736130775/full-shot-smiley-people-work-min_qreonb.jpg')",
      }}
    >
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

export default BannerHome;
