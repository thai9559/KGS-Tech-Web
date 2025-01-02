import React from 'react';

function Testimonials({ testimonials, title }) {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        {title}  {/* Render title passed as prop */}
      </h2>
      <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">{testimonial.quote}</p>  {/* Render quote passed as prop */}
            <span className="block font-semibold text-gray-800">{testimonial.name}</span>  {/* Render name passed as prop */}
            <span className="text-gray-500">{testimonial.position}</span>  {/* Render position passed as prop */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
