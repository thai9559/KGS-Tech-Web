// src/components/BlogSlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const blogData = [
  {
    id: 1,
    title: "Blog Post 1",
    imageUrl:
      "https://i.pinimg.com/736x/86/0a/fd/860afd97e98a5ac0d8c1dcc9087ff4b1.jpg",
    description: "This is the description for blog post 1",
    date: "2024-12-20", // Ngày đăng
  },
  {
    id: 2,
    title: "Blog Post 2",
    imageUrl:
      "https://i.pinimg.com/736x/52/53/3f/52533fd8f3742503453bd849769f7e1f.jpg",
    description: "This is the description for blog post 2",
    date: "2024-12-22",
  },
  {
    id: 3,
    title: "Blog Post 3",
    imageUrl:
      "https://i.pinimg.com/736x/df/8a/8e/df8a8ec01f58e4933ebf96734d878b07.jpg",
    description: "This is the description for blog post 3",
    date: "2024-12-25",
  },
  {
    id: 4,
    title: "Blog Post 4",
    imageUrl:
      "https://i.pinimg.com/736x/19/01/a7/1901a7994208a372544c486071edfb98.jpg",
    description: "This is the description for blog post 4",
    date: "2024-12-30",
  },
];

const BlogSlider = () => {
  const settings = {
    dots: true, // Hiển thị dots
    infinite: true, // Quay lại đầu khi hết slide
    speed: 500, // Thời gian chuyển slide
    slidesToShow: 1, // Số slide hiển thị cùng lúc
    slidesToScroll: 1, // Số slide cuộn mỗi lần
  };

  // Hàm chuyển đổi ngày tháng thành định dạng đẹp hơn
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options); // Thay đổi format tùy theo nhu cầu
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        Latest Blog Posts
      </h2>
      <Slider {...settings}>
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              className="w-full h-56 object-cover"
              src={blog.imageUrl}
              alt={blog.title}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition duration-300">
                {blog.title}
              </h3>
              <p className="mt-2 text-gray-600">{blog.description}</p>
              <p className="mt-4 text-sm text-gray-500 italic">
                {formatDate(blog.date)}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;
