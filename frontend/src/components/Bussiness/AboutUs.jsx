import React from 'react';

function AboutUs({ title, description, image,image1 }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="text-center md:text-left">
      <img src={image1} alt="Company Image" className="" />
      </div>
      <div className="flex justify-center md:justify-end">
        <img src={image} alt="Company Image" className="rounded-lg shadow-lg" />
      </div>
    </section>
  );
}

export default AboutUs;
