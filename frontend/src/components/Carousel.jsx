import React from "react";

const VerticalCarousel = ({ sections, onSectionClick }) => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const headerHeight = 60; // Điều chỉnh chiều cao header nếu cần
      window.scrollTo({
        top: section.offsetTop - headerHeight, // Cuộn đến vị trí phần tử
        behavior: "smooth", // Hiệu ứng cuộn mượt mà
      });
      onSectionClick(id); // Cập nhật phần tử active
    }
  };

  return (
    <div className="fixed top-1/2 transform z-30 -translate-y-1/2 right-4 flex flex-col items-center">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => handleScroll(section.id)}
          className={`w-4 h-4 rounded-full my-2 transition-all duration-700 ease-in-out transform ${
            section.active
              ? "bg-white scale-125 border-2 border-[#1ea0ff]"
              : "bg-blue-500 hover:bg-blue-600 scale-90 border-2 border-[#1ea0ff]"
          }`}
          style={{ zIndex: 100 }} // Đảm bảo các button có zIndex cao hơn các phần tử khác
        ></button>
      ))}
    </div>
  );
};

export default VerticalCarousel;
