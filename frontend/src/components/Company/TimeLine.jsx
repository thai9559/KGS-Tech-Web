import React, { useEffect, useState } from "react";

const Timeline = () => {
  const timelineData = [
    {
      year: "2021 - 2024",
      points: [
        "Đạt 4,000 kỹ sư",
        "Thành lập chi nhánh tại Châu Âu",
        "Công viên Sáng tạo TMA Bình Định đạt 600 kỹ sư",
        "Thành lập Hardware Lab",
      ],
    },
    {
      year: "2016 - 2020",
      points: [
        "Đạt 2,500 kỹ sư",
        "Thành lập chi nhánh tại Singapore",
        "Thành lập Công ty Sáng tạo TMA",
        "Khai trương Công viên Sáng tạo TMA Bình Định",
        "Thành lập Trung tâm Công nghệ 5G",
        "Thành lập Trung tâm Phần mềm Xe hơi",
      ],
    },
    {
      year: "2011 - 2015",
      points: [
        "Thành lập Trung tâm nghiên cứu AI",
        "Thành lập chi nhánh tại Mỹ",
        "Đạt 1,000 kỹ sư",
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".timeline-section");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top < window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2
        ) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-gray-50 p-6">
      {/* Timeline */}
      <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-gray-300 h-full z-0">
        {/* Dùng một đoạn thẳng đứng liền mạch */}
      </div>

      {timelineData.map((data, index) => (
        <div
          key={index}
          className={`timeline-section relative flex ${
            index % 2 === 0 ? "flex-row-reverse" : "flex-row"
          } items-center py-16`}
        >
          {/* Vertical Line */}
          <div
            className={`absolute ${
              index % 2 === 0 ? "right-0" : "left-0"
            } h-full w-1 bg-blue-500`}
            style={{
              top: "0",
              height: index < activeIndex ? "100%" : "50px", // Điều chỉnh chiều cao
            }}
          ></div>

          {/* Horizontal Line */}
          <div
            className={`absolute ${
              index % 2 === 0 ? "right-1/2" : "left-1/2"
            } top-0 h-1 w-1/2 bg-blue-500`}
          ></div>

          {/* Image Section */}
          <div className="w-1/2 px-4">
            <img
              src="https://res.cloudinary.com/dtnuj2les/image/upload/v1736306408/high-angle-people-working-desk-min_dbrwxd.jpg"
              alt="Timeline visual"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="w-1/2 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-600">{data.year}</h2>
              <ul className="mt-4 space-y-2">
                {data.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-700 text-base"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
