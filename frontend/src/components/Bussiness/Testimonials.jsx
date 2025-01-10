import React from "react";

function Testimonials({ testimonials, title }) {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        {title} {/* Render title passed as prop */}
      </h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-16 justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-full sm:w-full md:w-full lg:w-1/3 space-y-4"  // Set w-full for all breakpoints
          >
            {/* Image Section */}
            <div className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px]">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="text-center sm:text-center">
              <p className="text-lg text-gray-700 font-notoSansJP mb-2">
                {testimonial.quote}
              </p>
              <span className="block text-xl font-notoSansJP font-bold text-black mb-1">
                {testimonial.name}
              </span>
              <span className="text-gray-500 font-notoSansJP">
                {testimonial.position}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
