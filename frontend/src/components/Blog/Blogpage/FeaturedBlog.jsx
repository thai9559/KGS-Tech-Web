import React, { useState, useRef } from "react";
import { Spin } from "antd";

const FeaturedBlog = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const blogsPerPage = 4;

  // Ref để cuộn lên đúng phần FeaturedBlog
  const featuredBlogRef = useRef(null);

  // Calculate blogs to display based on current page
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    setIsLoading(true); // Bắt đầu loading
    setTimeout(() => {
      setCurrentPage(page); // Đổi trang
      setIsLoading(false); // Kết thúc loading
      const offset = -80; // Đệm để đảm bảo tiêu đề không bị mất
      const elementPosition =
        featuredBlogRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 500); // Thời gian loading giả lập (0.5 giây)
  };

  return (
    <section className="mb-16 max-w-7xl mx-auto" ref={featuredBlogRef}>
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
        Featured Blogs
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 rounded-2xl   bg-gray-50 gap-10">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Blog Image */}
              <div className="p-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
              {/* Blog Content */}
              <div className="px-6 pb-6">
                <h3 className="font-semibold text-2xl text-gray-800 mb-4">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {blog.description}
                </p>
                {/* Category Button Tag */}
                <button className="bg-blue-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                  {blog.category}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlog;
