// import React from "react";
// import { FaChevronDown } from "react-icons/fa";

// const Banner = ({ onScrollToContent }) => {
//   return (
//     <div
//       className="relative w-full h-[450px] md:h-[800px] bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://res.cloudinary.com/dtnuj2les/image/upload/v1735895946/close-up-young-colleagues-having-meeting_akm1o4.jpg')",
//       }}
//     >
//       {/* Title and Content (for desktop) */}
//       <div className="absolute top-[10rem] left-[10rem] p-8 text-white hidden md:block">
//         <h1 className="text-4xl md:text-xl text-primary font-bold">Sứ Mệnh</h1>
//         <p className="mt-4 text-lg md:text-6xl font-bold font-beVietnam max-w-lg">
//           Giải pháp công nghệ tiên tiến, giúp doanh nghiệp vươn tầm quốc tế.
//         </p>
//       </div>

//       {/* Title and Content (for mobile) */}
//       <div className="md:hidden bg-primary text-white p-6">
//         <h1 className="text-2xl font-bold">Sứ Mệnh</h1>
//         <p className="mt-2 text-lg">
//           Giải pháp công nghệ tiên tiến, giúp doanh nghiệp vươn tầm quốc tế.
//         </p>
//       </div>

//       {/* Nút mũi tên xuống */}
//       <button
//         onClick={onScrollToContent}
//         className="absolute bottom-[-20px] left-[80%] transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 z-10"
//       >
//         <FaChevronDown size={15} />
//       </button>
//     </div>
//   );
// };

// export default Banner;

import React from "react";
import Slider from "react-slick";
import { FaChevronDown } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = ({ onScrollToContent }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
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
        onClick={onScrollToContent} // Khi nhấn vào nút sẽ cuộn xuống phần nội dung
        className="absolute bottom-[-20px] left-[80%] transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 z-10"
      >
        <FaChevronDown size={15} />
      </button>
    </div>
  );
};

export default BannerSlider;
