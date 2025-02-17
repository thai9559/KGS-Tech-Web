import React from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const { t } = useTranslation();

  const services = t("servicesBanner", { returnObjects: true });

  return (
    <section className="relative -mt-64 z-20 px-4">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            subtitle={service.subtitle}
            description={service.description}
            price={service.price}
            duration={service.duration}
            highlighted={service.highlighted}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
