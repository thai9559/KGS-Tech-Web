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
    autoplaySpeed: 3000, 
  };

  return (
    <div className="w-[80%] mx-auto">
      <Slider {...settings}>
        <div>
          <img
            src="https://i.pinimg.com/736x/91/7d/19/917d197500d94b21d0e6761c6cce7c4a.jpg"
            alt="Banner 1"
            className="w-full h-[700px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/736x/ea/77/65/ea7765eba55018e2754ffbb444505e39.jpg"
            alt="Banner 2"
            className="w-full h-[700px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/736x/63/40/6d/63406dba956b1ffa625d254e7bfb3b05.jpg"
            alt="Banner 3"
            className="w-full h-[700px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;
