import React, { useState, useEffect } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra khi người dùng cuộn trang xuống
  const checkScrollTop = () => {
    if (!isVisible && window.pageYOffset > 300) {
      setIsVisible(true);
    } else if (isVisible && window.pageYOffset <= 300) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hiệu ứng cuộn mượt mà
    });
  };

  // Thêm event listener để theo dõi cuộn trang
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [isVisible]);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-4 p-4 z-50 bg-blue-500 hover:bg-blue-400 text-white rounded-full shadow-lg transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      } hover:bg-primary-dark`}
      style={{ transition: "opacity 0.3s ease" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 18"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7-7-7 7"
        />
      </svg>
    </button>
  );
}

export default ScrollToTop;
