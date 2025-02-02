import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials({ testimonials, title }) {
  const settings = {
    dots: true, // Hiển thị chấm điều hướng
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true, // Hiển thị nút điều hướng
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-16 bg-gray-50 relative">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        {title}
      </h2>
      <div className="max-w-4xl mx-auto relative">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center px-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <p className="text-lg text-gray-700 italic">
                "{testimonial.quote}"
              </p>
              <span className="block text-xl font-bold text-black mt-4">
                {testimonial.name}
              </span>
              <span className="text-gray-500">{testimonial.position}</span>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

// Nút Next tuỳ chỉnh
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-[-25px] transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 z-10"
  >
    ❯
  </button>
);

// Nút Prev tuỳ chỉnh
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-[-25px] transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 z-10"
  >
    ❮
  </button>
);

export default Testimonials;
