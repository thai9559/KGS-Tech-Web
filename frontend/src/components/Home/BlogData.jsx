import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useGetBlogsQuery } from "../../redux/api/blogApi";
import { useTranslation } from "react-i18next";
const BlogList = () => {
  const { data, isLoading, isFetching, error, refetch } = useGetBlogsQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log(data);
  // Tự động reload dữ liệu mỗi 60 giây
  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); // Gọi lại API để lấy dữ liệu mới
    }, 60000); // 60000ms = 60 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, [refetch]);

  const decodeHtml = (text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", options);
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  if (isLoading || isFetching)
    return (
      <p className="text-black text-2xl font-notoSansJP text-center">
        Loading...
      </p>
    );

  if (error) {
    console.error("API Error:", error);
    return (
      <p className="text-black text-2xl font-notoSansJP text-center">
        Error loading blogs. Please try again later.
      </p>
    );
  }

  const blogs = data?.data || [];
  if (!blogs.length) return <p>No blogs found.</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 lg:px-8">
      <Helmet>
        <title>KGS Tech Blogs</title>
      </Helmet>

      <h2 className="text-4xl font-notoSansJP font-extrabold text-center text-gray-800 mb-8">
        {t("blog")}
      </h2>

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div
          className="w-full lg:w-8/12 bg-white border-2 mb-2 cursor-pointer border-gray-200 rounded-xl shadow-lg"
          onClick={() => handleBlogClick(blogs[0].id)}
        >
          <img
            className="w-full h-72 object-cover rounded-t-xl"
            src={blogs[0].thumbnail_image}
            alt={decodeHtml(blogs[0].title)}
          />
          <div className="p-6">
            <h3 className="text-3xl font-bold font-notoSansJP text-gray-800 hover:text-indigo-600 transition duration-300">
              {decodeHtml(blogs[0].title)}
            </h3>
            <p className="mt-4 text-gray-700 font-notoSansJP line-clamp-5">
              {decodeHtml(blogs[0].content)}
            </p>
            <p className="mt-4 text-sm font-notoSansJP text-gray-500 italic">
              Ngày đăng: {formatDate(blogs[0].created_at)}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-4/12 flex flex-col gap-2">
          {blogs.slice(0, 4).map((blog) => (
            <div
              key={blog.id}
              className="bg-white border-2 border-gray-200 cursor-pointer rounded-lg shadow-lg p-4 flex flex-col sm:flex-row gap-4"
              onClick={() => handleBlogClick(blog.id)}
            >
              <img
                className="w-full sm:w-1/3 h-24 object-cover rounded-lg"
                src={blog.thumbnail_image}
                alt={decodeHtml(blog.title)}
              />
              <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold font-notoSansJP text-gray-800 hover:text-indigo-600 transition duration-300">
                  {decodeHtml(blog.title)}
                </h3>
                <p className="text-sm font-notoSansJP text-gray-600 line-clamp-2">
                  {decodeHtml(blog.content).substring(0, 100)}...
                </p>
                <p className="text-sm font-notoSansJP text-gray-500 italic">
                  Ngày đăng: {formatDate(blog.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
