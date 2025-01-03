import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
  };

  return (
    <div className="w-[100%] mx-auto">
      <Slider {...settings}>
        <div>
          <img
            src="https://th.bing.com/th/id/OIP.iejvk6XSWz0KZ9JHvjnT6gHaD5?rs=1&pid=ImgDetMain"
            alt="Banner 1"
            className="w-full h-full   "
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/736x/a8/fb/8a/a8fb8ae5925fdea0c79a8e7148a3a195.jpg"
            alt="Banner 2"
            className="w-full h-[700px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/736x/2f/f9/38/2ff93805b8023f1d6d44f5d45854ca25.jpg"
            alt="Banner 3"
            className="w-full h-[700px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;
