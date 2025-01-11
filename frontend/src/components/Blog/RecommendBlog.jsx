import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendBlog = ({ blogs }) => {
  const navigate = useNavigate(); // Hàm điều hướng

  const handleClick = (id) => {
    navigate(`/blog/${id}`); // Điều hướng tới trang chi tiết bài viết với ID tương ứng
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Các bài viết liên quan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick(blog.id)} // Thêm sự kiện click
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {blog.title}
              </h3>{" "}
              {/* Thêm truncate */}
              <p className="text-gray-600 mt-2 line-clamp-5">
                {blog.description}
              </p>{" "}
              {/* Thêm line-clamp */}
              <a
                href="#"
                className="mt-4 inline-block text-blue-500 hover:text-blue-600"
                onClick={(e) => e.preventDefault()} // Ngừng hành động mặc định của thẻ a
              >
                Đọc thêm
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendBlog;
