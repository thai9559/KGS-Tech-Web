import React from "react";

const ServiceCard = ({
  icon,
  title,
  subtitle,
  description,
  price,
  duration,
}) => {
  return (
    <div className="group relative p-6 text-left border rounded-lg shadow-md bg-white text-black transition-all duration-300 transform hover:scale-105 group-hover:bg-blue-700 group-hover:text-white">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gray-200 text-black group-hover:bg-blue-500 group-hover:text-blue-700">
        <i className={`fas ${icon} text-xl`}></i>
      </div>

      {/* Title and subtitle */}
      <h3 className="text-lg font-bold mb-2 font-notoSansJP text-black group-hover:text-black">
        {title}
      </h3>
      <p className="text-sm text-black font-notoSansJP group-hover:text-black">
        {subtitle}
      </p>

      {/* Description */}
      <p className="mt-4 text-sm text-black font-notoSansJP group-hover:text-black ">
        {description}
      </p>
      {/* Price and duration */}
      <div className="mt-4 text-sm mb-14">
        <p>
          <span className="font-medium font-notoSansJP">Price:</span> ${price}
        </p>
        <p>
          <span className="font-medium font-notoSansJP text-black">
            Duration:
          </span>{" "}
          {duration}
        </p>
      </div>

      {/* Button */}
      <button className="absolute left-[10%] bottom-[6%] mt-6 px-4 py-2 font-notoSansJP w-[80%] rounded-md font-medium border border-blue-700 text-blue-700 transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white group-hover:border-white">
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;
