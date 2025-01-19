import React from "react";

const PopularBlog = ({ blogs }) => {
  return (
    <section className="mb-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Popular Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.slice(4, 7).map((blog) => (
          <div
            key={blog.id}
            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            {/* Blog Image */}
            <div className="relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <p className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                {blog.category}
              </p>
            </div>

            {/* Blog Content */}
            <div className="p-6">
              <h3
                className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 cursor-pointer"
                style={{ minHeight: "3.5rem" }} // Đảm bảo tiêu đề cố định chiều cao
              >
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 mt-4 line-clamp-2">
                {blog.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-gray-400">{blog.date}</p>
                <button className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBlog;
