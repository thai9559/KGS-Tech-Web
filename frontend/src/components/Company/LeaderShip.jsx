import React from "react";
import { Card } from "antd";
import { useTranslation } from "react-i18next";

const Leadership = ({ leaders }) => {
  const { t } = useTranslation(); // Hook để truy cập dịch

  return (
    <section className="py-16 bg-white">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-8">
        {t("leadership.title")}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {leaders.map((leader, index) => (
          <div
            key={index}
            className="w-72 h-[400px] bg-white rounded-lg transition-transform transform sm:hover:scale-105 overflow-hidden group border-b-4 hover:border-blue-600 hover:shadow-xl"
          >
            <img
              src={leader.avatar}
              alt={`Avatar of ${leader.name}`}
              className="w-full h-[80%] bg-top object-cover transition-all duration-300"
            />
            <div className="p-4 flex flex-col justify-center items-center">
              <h3 className="text-base font-semibold font-notoSansJP text-gray-800">
                {t("leadership.name", { name: leader.name })}
              </h3>
              <p className="text-sm font-notoSansJP text-gray-600">
                {t(`leadership.${leader.position.toLowerCase()}`)}
              </p>{" "}
              {/* Dịch chức vụ */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;
