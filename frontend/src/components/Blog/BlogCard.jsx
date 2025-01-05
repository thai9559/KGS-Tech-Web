import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6 cursor-pointer">
      {/* Blog Image */}
      <div className="w-[300px] md:w-1/3">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-48 md:h-full w-full object-cover object-center"
        />
      </div>
      {/* Blog Content */}
      <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
        <div>
          <h3 className="text-base font-bold text-black mb-2">{blog.title}</h3>
          <p className="text-black mb-4">{blog.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-black">{blog.date}</span>
          <a
            href={blog.link}
            className="text-blue-500 hover:underline text-sm font-medium"
          >
            Xem thêm →
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
