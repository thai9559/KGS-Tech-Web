import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 1500, 
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
            src="https://res.cloudinary.com/dtnuj2les/image/upload/v1735895694/people-learning-language-medium-shot_mlfjha.jpg"
            alt="Banner 1"
            className="w-full h-[450px] md:h-[800px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dtnuj2les/image/upload/v1735895946/close-up-young-colleagues-having-meeting_akm1o4.jpg"
            alt="Banner 2"
            className="w-full h-[450px] md:h-[800px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dtnuj2les/image/upload/v1735896054/concentrated-woman-with-students-table_fglrfz.jpg"
            alt="Banner 3"
            className="w-full h-[450px] md:h-[800px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default BannerSlider;
