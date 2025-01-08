import React from 'react';

function Services({ title, services }) {
  return (
    <section className="bg-white py-12 px-2"> 
      <h2 className="text-2xl text-primary font-semibold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 p-2 md:grid-cols-3 gap-[15px]">
        {services.map((service, index) => (
          <div
            key={index}
            className="text-center bg-gray-100 p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              {service.title}
            </h3>
            <p className="text-black">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
