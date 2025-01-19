import React from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    {
      icon: "fa-laptop-code",
      title: "Custom Software Development",
      subtitle: "Tailored IT Solutions",
      description: "We create customized software to meet your business needs.",
      price: "500.00",
      duration: "5-10 days",
      highlighted: true,
    },
    {
      icon: "fa-headset",
      title: "Technical Support",
      subtitle: "24/7 Assistance",
      description:
        "Reliable and fast technical support for your IT infrastructure.",
      price: "100.00",
      duration: "1-2 hours",
      highlighted: false,
    },
    {
      icon: "fa-cloud-upload-alt",
      title: "Cloud Migration Services",
      subtitle: "Seamless Integration",
      description:
        "Migrate to the cloud with zero downtime and high efficiency.",
      price: "300.00",
      duration: "3-5 days",
      highlighted: false,
    },
    {
      icon: "fa-shield-alt",
      title: "Cybersecurity Solutions",
      subtitle: "Secure Your Business",
      description:
        "Protect your business from cyber threats with our audit services.",
      price: "200.00",
      duration: "2-3 days",
      highlighted: false,
    },
  ];

  return (
    <section className="relative -mt-64 z-20 px-4">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-4 sm:grid-cols-2">
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
