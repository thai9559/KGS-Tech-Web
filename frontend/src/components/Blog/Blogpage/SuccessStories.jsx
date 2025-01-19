import React from "react";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      title: "Tăng doanh số 70% trong 3 tháng",
      description:
        "Công ty ABC đã tăng trưởng vượt bậc trong doanh thu nhờ áp dụng giải pháp công nghệ của chúng tôi.",
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735810892/cld-sample.jpg",
      client: "Công ty ABC",
    },
    {
      id: 2,
      title: "Giảm chi phí vận hành 30%",
      description:
        "Công ty XYZ đã tối ưu hóa chi phí và tăng hiệu quả nhờ vào phần mềm quản lý hiện đại.",
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735810892/cld-sample.jpg",
      client: "Công ty XYZ",
    },
    {
      id: 3,
      title: "Cải thiện hiệu suất làm việc",
      description:
        "Nhân viên của Công ty DEF đã làm việc hiệu quả hơn, tiết kiệm 20% thời gian xử lý công việc.",
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735810892/cld-sample.jpg",
      client: "Công ty DEF",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-blue-100 to-blue-200 py-16">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Success Stories
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Khám phá những câu chuyện thành công từ các đối tác và khách hàng của
          chúng tôi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={story.image}
                alt={story.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {story.description}
                </p>
                <p className="text-gray-500 text-sm italic">- {story.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
