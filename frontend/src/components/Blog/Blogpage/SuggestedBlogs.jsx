import React from "react";
import { FaArrowRight } from "react-icons/fa";

const SuggestedBlogs = ({ blogs }) => {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Blog Gợi Ý</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-4">
          {blogs.map((blog, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-all duration-200 p-4 rounded-lg shadow-sm"
            >
              {/* Blog Icon/Placeholder */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-lg">{index + 1}</span>
                </div>
                <a
                  href={blog.link}
                  className="text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  {blog.title}
                </a>
              </div>

              {/* Arrow Icon */}
              <a
                href={blog.link}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FaArrowRight className="w-5 h-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SuggestedBlogs;
