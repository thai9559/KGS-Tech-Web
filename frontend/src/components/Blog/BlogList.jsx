import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg mb-6 p-6 hover:shadow-lg hover:shadow-blue-500 cursor-pointer"
          onClick={() => handleBlogClick(blog.id)}  // Chuyển hướng đến trang chi tiết khi click vào blog
        >
          {/* Hình ảnh minh họa */}
          <img
            src={blog.image || "https://via.placeholder.com/800x400?text=Blog+Image"}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          {/* Tiêu đề blog */}
          <h3 className="text-2xl font-semibold text-black mb-2">{blog.title}</h3>

          {/* Ngày đăng */}
          <p className="text-sm text-gray-500 mb-4">
            Ngày đăng: {new Date(blog.date).toLocaleDateString()}
          </p>

          {/* Mô tả */}
          <p className="text-lg text-black mb-4 line-clamp-3">
            {blog.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a eros urna. Vivamus et efficitur nunc. Integer nec est eros."}
          </p>

          {/* Button Xem thêm */}
          <Button
            type="primary"
            className="text-white"
            onClick={(e) => {
              e.stopPropagation();  // Ngừng sự kiện click để không gây lỗi chuyển hướng
              window.open(blog.link, "_blank");
            }}
          >
            Xem thêm
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
