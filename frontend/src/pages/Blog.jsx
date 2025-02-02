import React from "react";
import BlogPage from "../components/Blog/BlogPage";
import Layout from "../components/Layout";
import { useGetBlogsQuery } from "../redux/api/blogApi";

const Blog = () => {
  // Gọi API để lấy danh sách blog
  const { data: blogsData, isLoading, isError } = useGetBlogsQuery();

  const suggestedBlogs = [
    { title: "Tìm hiểu về Hooks trong React", link: "#" },
    { title: "Cách sử dụng Context API", link: "#" },
    { title: "Thiết kế giao diện với Material-UI", link: "#" },
  ];

  // Xử lý trạng thái tải và lỗi
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <p>Đang tải danh sách blog...</p>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <p>Đã xảy ra lỗi khi tải danh sách blog. Vui lòng thử lại sau.</p>
        </div>
      </Layout>
    );
  }

  // Lấy danh sách blog từ API
  const blogs = blogsData?.data || [];

  return (
    <Layout showBanner="true">
      <div className="container mx-auto p-6">
        <BlogPage blogs={blogs} suggestedBlogs={suggestedBlogs} />
      </div>
    </Layout>
  );
};

export default Blog;
