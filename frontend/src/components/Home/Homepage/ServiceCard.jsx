import React from "react";

const ServiceCard = ({
  icon,
  title,
  subtitle,
  description,
  price,
  duration,
  highlighted,
}) => {
  return (
    <div
      className={`p-6 text-left border rounded-lg shadow-md ${
        highlighted ? "bg-temp text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          highlighted ? "bg-white text-green-700" : "bg-gray-200 text-gray-600"
        }`}
      >
        <i className={`fas ${icon} text-xl`}></i>
      </div>

      {/* Title and subtitle */}
      <h3
        className={`text-lg font-bold mb-2 ${
          highlighted ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm ${highlighted ? "text-gray-200" : "text-gray-600"}`}
      >
        {subtitle}
      </p>

      {/* Description */}
      <p
        className={`mt-4 text-sm ${
          highlighted ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {description}
      </p>

      {/* Price and duration */}
      <div className="mt-4 text-sm">
        <p>
          <span className="font-medium">Price:</span> ${price}
        </p>
        <p>
          <span className="font-medium">Duration:</span> {duration}
        </p>
      </div>

      {/* Button */}
      <button
        className={`mt-6 px-4 py-2 w-full rounded-md font-medium ${
          highlighted
            ? "bg-white text-green-700 hover:bg-gray-100"
            : "border border-green-700 text-green-700 hover:bg-green-50"
        }`}
      >
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;
