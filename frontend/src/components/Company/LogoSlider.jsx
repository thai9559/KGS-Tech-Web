import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const LogoSlider = ({ logos }) => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-12">
        {t("Collabs.title")}
      </h2>
      <Slider {...settings} className="px-4">
        {logos.map((logo, index) => (
          <div key={index} className="px-2 flex justify-center">
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className="w-50 h-24 object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LogoSlider;
