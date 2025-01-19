import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-50">
      {/* Full-width background image with border radius */}
      <div className="w-full mx-auto ">
        <img
          src="https://res.cloudinary.com/dtnuj2les/image/upload/v1736306408/high-angle-people-working-desk-min_dbrwxd.jpg"
          alt="IT Solutions Banner"
          className="w-full h-[800px] object-cover  shadow-lg"
        />
      </div>
      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-[5%]">
        <h1 className="text-5xl font-bold mb-6">
          Empowering Your Business with IT Solutions
        </h1>
        <p className="text-lg mb-4">
          Our mission is to deliver cutting-edge technology that drives your
          success.
        </p>
        <button className="px-6 py-2 bg-orange-700 text-white rounded-md shadow-lg hover:bg-green-800">
          Learn More About Us
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
