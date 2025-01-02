// src/components/Mission.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Mission = () => {
  const { t } = useTranslation(); 

  return (
    <section className="py-16 bg-blue-100">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">{t('mission.title')}</h2> {/* Đổi tiêu đề */}
      <p className="text-lg text-center text-gray-700 max-w-4xl mx-auto">{t('mission.description')}</p> {/* Đổi mô tả */}
    </section>
  );
};

export default Mission;
