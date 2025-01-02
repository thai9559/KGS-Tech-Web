import React from "react";

const VerticalCarousel = ({ sections, onSectionClick }) => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const headerHeight = 50; // Giả sử header có chiều cao 50px, điều chỉnh nếu cần
      window.scrollTo({
        top: section.offsetTop - headerHeight, // Điều chỉnh offset với header
        behavior: "smooth",
      });
      onSectionClick(id); // Cập nhật active section khi cuộn
    }
  };

  return (
    <div className="fixed top-1/2 transform z-50 -translate-y-1/2 right-4 flex flex-col items-center">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => handleScroll(section.id)}
          className={`w-4 h-4 rounded-full my-2 transition-all duration-700 ease-in-out transform ${
            section.active
              ? "bg-white scale-125 border-2 border-[#1ea0ff]" // Khi active, màu trắng và phóng to với border xanh
              : "bg-blue-500 hover:bg-blue-600 scale-90 border-2 border-[#1ea0ff]" // Khi chưa active, có border xanh nhẹ
          }`}
          style={{ zIndex: 100 }} // Đảm bảo button luôn nổi bật phía trên các phần tử khác
        ></button>
      ))}
    </div>
  );
};

export default VerticalCarousel;
