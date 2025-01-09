import React from "react";

const Banner = ({ title, description }) => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div
        className="w-full h-[450px] md:h-[850px] bg-cover object-cover bg-top-right"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dtnuj2les/image/upload/v1736130775/full-shot-smiley-people-work-min_qreonb.jpg')",
        }}
      />

      {/* <div className="absolute w-[350px] top-[10rem] left-[6rem] hidden md:block text-white">
<div className="bg-black/50 p-4 rounded-lg shadow-lg">
  <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
  <p className="text-sm md:text-lg mt-2">{description}</p>
</div>
</div> */}

      {/* Title and Content (for mobile) */}
      {/* <div className="block md:hidden bg-black/50 text-white p-6 text-center  shadow-lg">
        <h1 className="text-2xl text-pr font-bold mb-4">{title}</h1>
        <p className="text-base text-white">{description}</p>
      </div> */}

    </div>
  );
};

export default Banner;

