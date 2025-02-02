import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

function Testimonials() {
  const { t } = useTranslation();
  const testimonials = [
    {
      quote: t("BusinessPage.whatClientsSay.testimony2"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306406/medium-shot-smiley-colleagues-working-together-min_ahrn7i.jpg",
      name: t("BusinessPage.whatClientsSay.name2"),
      position: t("BusinessPage.whatClientsSay.position2"),
    },
    {
      quote: t("BusinessPage.whatClientsSay.testimony1"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306405/labor-union-members-working-together-min_gadspn.jpg",
      name: t("BusinessPage.whatClientsSay.name1"),
      position: t("BusinessPage.whatClientsSay.position1"),
    },
  ];

  const settings = {
    dots: true, // Hiển thị chấm điều hướng
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true, // Hiển thị nút điều hướng
  };

  return (
    <section className="py-16 bg-gray-50 relative">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        {t("BusinessPage.whatClientsSay.title")}
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

export default Testimonials;
