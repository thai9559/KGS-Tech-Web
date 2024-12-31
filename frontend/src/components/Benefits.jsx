import React from 'react';
import { useTranslation } from 'react-i18next';

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    { 
      title: t('benefits.technology'), 
      description: t('benefits.technology_description')
    },
    { 
      title: t('benefits.professional_team'), 
      description: t('benefits.professional_team_description')
    },
    { 
      title: t('benefits.custom_solutions'), 
      description: t('benefits.custom_solutions_description')
    },
    { 
      title: t('benefits.sustainable_growth'), 
      description: t('benefits.sustainable_growth_description')
    },
    { 
      title: t('benefits.customer_service'), 
      description: t('benefits.customer_service_description')
    },
    { 
      title: t('benefits.strategic_advice'), 
      description: t('benefits.strategic_advice_description')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-10">
      {benefits.map((benefit) => (
        <div 
          key={benefit.title} 
          className="relative p-8 bg-[#1ea0ff] text-center text-white rounded-lg shadow-lg overflow-hidden group transition-all duration-500 h-[250px]"
        >
          {/* Lớp phủ chuyển màu nền từ top xuống khi hover */}
          <div className="absolute inset-0 bg-[#E5D9F2] transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 origin-top z-0"></div>

          {/* Nội dung */}
          <div className="relative z-10 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            <h2 className="text-2xl font-bold">{benefit.title}</h2>
          </div>

          {/* Mô tả hiển thị khi hover */}
          <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <p className="text-black">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
