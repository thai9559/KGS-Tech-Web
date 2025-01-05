// src/components/CoreValues.js
import React from "react";
import { FaLeaf, FaChartLine, FaHandshake } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CoreValues = ({ values }) => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      {/* Tiêu đề phần CoreValues */}
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-12">
        {t("coreValues.title")} {/* Tiêu đề được dịch */}
      </h2>

      {/* Các giá trị cốt lõi */}
      <div className="flex flex-wrap justify-center gap-5">
        {values.map((value, index) => (
          <div
            key={index}
            className="w-96 p-10 flex justify-center items-center flex-col shadow-lg rounded-xl text-center transform transition-all sm:hover:scale-105 sm:hover:shadow-2xl bg-white"
          >
            {/* Icon minh họa */}
            <div className="mb-6 text-4xl text-blue-600">
              {index === 0 ? (
                <FaLeaf />
              ) : index === 1 ? (
                <FaChartLine />
              ) : (
                <FaHandshake />
              )}
            </div>

            {/* Tiêu đề và mô tả */}
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              {value.title}
            </h3>
            <p className="text-base font-medium text-gray-700 mb-4">
              {value.description}
            </p>
            <p className="text-md text-gray-600">{value.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
