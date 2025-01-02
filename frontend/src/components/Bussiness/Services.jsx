import React from 'react';

function Services({ title, services }) {
  return (
    <section className="bg-white py-12">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">{title}</h2> {/* Displaying the section title */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4"> {/* Centering the icon */}
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
