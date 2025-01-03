import React from "react";

const BlogPreview = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p className="text-gray-700">{blog.content}</p>
    </div>
  );
};

export default BlogPreview;
