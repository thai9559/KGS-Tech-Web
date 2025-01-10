// src/components/CoreValues.js
import React from "react";
import { FaLeaf, FaChartLine, FaHandshake } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CoreValues = ({ values }) => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      {/* Tiêu đề phần CoreValues */}
      <h2 className="text-4xl font-semibold text-center text-orange-700 mb-12">
        {t("coreValues.title")}
      </h2>

      {/* Các giá trị cốt lõi */}
      <div className="flex flex-wrap justify-center">
        {values.map((value, index) => (
          <div
            key={index}
            className="w-96 p-10 flex justify-center items-center flex-col text-center transform transition-all sm:hover:scale-105 sm:hover:shadow-2xl bg-white outline outline-2 outline-black"
          >
            {/* Icon và nội dung */}
            <div className="flex flex-row justify-center items-center">
              {/* Nội dung text */}
              <div className="flex flex-col text-left">
                {/* Tiêu đề và mô tả */}
                <h3 className="text-xl font-semibold text-gray700 mb-4">
                  {value.title}
                </h3>
                <p className="text-base font-notoSansJP font-medium text-gray-700 mb-4">
                  {value.description}
                </p>
                <p className="text-md text-gray-600">{value.details}</p>
              </div>

              {/* Icon minh họa */}
              <div className="text-4xl text-blue-500 ml-3">
                {index === 0 ? (
                  <FaLeaf />
                ) : index === 1 ? (
                  <FaChartLine />
                ) : (
                  <FaHandshake />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
