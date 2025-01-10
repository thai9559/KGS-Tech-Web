import React from "react";

const SuggestedBlogs = ({ blogs }) => {
  // Kiểm tra xem blogs có phải là một mảng hợp lệ không
  if (!Array.isArray(blogs)) {
    console.error('Blogs should be an array, but received:', blogs);
    return <p className="text-black">Không có blog gợi ý nào.</p>; // Hoặc bạn có thể trả về mảng rỗng
  }

  return (
    <div className="bg-white p-6  rounded-lg">
      <h3 className="text-lg font-bold text-black mb-4">Blog Gợi Ý</h3>
      <ul className="space-y-4">
        {blogs.map((blog, index) => (
          <li key={index}>
            <a
              href={blog.link}
              className="text-blue-500 hover:underline text-sm font-medium"
            >
              {blog.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedBlogs;
