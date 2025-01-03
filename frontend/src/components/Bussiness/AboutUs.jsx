import React from 'react';

function AboutUs({ title, description, image,image1 }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="text-center p-4 md:text-left">
      <h2 className="text-2xl text-black font-bold mb-4">{title}</h2>
      <p className="text-lg text-gray-700">{description}</p>

      </div>
      <div className="flex justify-center md:justify-end">
        <img src={image} alt="Company Image" className="rounded-lg shadow-lg" />
      </div>
    </section>
  );
}

export default AboutUs;
