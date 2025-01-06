import React from 'react';

function Testimonials({ testimonials, title }) {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center text-primary mb-8">
        {title}  {/* Render title passed as prop */}
      </h2>
      <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-black mb-4">{testimonial.quote}</p>  
            <span className="block font-semibold text-black">{testimonial.name}</span>  
            <span className="text-black">{testimonial.position}</span> 
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
