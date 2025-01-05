import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaSmile,
  FaTrophy,
  FaGlobe,
  FaCheckCircle,
  FaStar,
  FaPhone,
  FaMoneyBillWave,
  FaCog,
  FaAward,
} from "react-icons/fa";

const StatsCard = ({ icon, title, number }) => (
  <div className="flex flex-col items-center text-center space-y-2">
    <div className="text-primary text-2xl">{icon}</div>
    <p className="text-black font-semibold text-xl">{number}</p>
    <p className="text-black text-xl font-beVietnam font-semibold">{title}</p>
  </div>
);

const CompanyStats = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8">
      <StatsCard icon={<FaUsers />} title={t("stats.users")} number="50,000+" />
      <StatsCard
        icon={<FaSmile />}
        title={t("stats.happyUsers")}
        number="99%"
      />
      <StatsCard icon={<FaTrophy />} title={t("stats.awards")} number="10+" />
      <StatsCard icon={<FaGlobe />} title={t("stats.countries")} number="5" />
      <StatsCard
        icon={<FaCheckCircle />}
        title={t("stats.genuineService")}
        number="100%"
      />
      <StatsCard icon={<FaStar />} title={t("stats.ratings")} number="4.9/5" />
      <StatsCard
        icon={<FaPhone />}
        title={t("stats.customerSupport")}
        number="24/7"
      />
      <StatsCard
        icon={<FaMoneyBillWave />}
        title={t("stats.revenue")}
        number="500M USD"
      />
      <StatsCard
        icon={<FaCog />}
        title={t("stats.technology")}
        number="AI, Big Data"
      />
      <StatsCard
        icon={<FaAward />}
        title={t("stats.certifications")}
        number="ISO 9001"
      />
    </div>
  );
};

export default CompanyStats;
