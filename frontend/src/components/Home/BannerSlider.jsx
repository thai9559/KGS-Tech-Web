import React from "react";
import Slider from "react-slick";
import { FaChevronDown } from "react-icons/fa";  // Import icon mũi tên xuống
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = ({ onScrollToContent }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-[100%] mx-auto relative">
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

      {/* Nút mũi tên xuống */}
      <button
        onClick={onScrollToContent}  // Khi nhấn vào nút sẽ cuộn xuống phần nội dung
        className="absolute bottom-[-20px] left-[80%] transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 z-10"
      >
        <FaChevronDown size={15} />
      </button>
    </div>
  );
};

export default BannerSlider;
