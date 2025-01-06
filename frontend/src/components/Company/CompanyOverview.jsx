// src/components/CompanyOverview.js
import React from "react";

const CompanyOverview = ({ title, description }) => {
  return (
    <section className="flex flex-col items-center text-center py-12 bg-gray-50">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">{title}</h1>
      <p className="text-base text-gray-700 max-w-4xl mx-auto">{description}</p>
    </section>
  );
};

export default CompanyOverview;
