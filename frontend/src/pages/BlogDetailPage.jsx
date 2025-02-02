import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTranslation } from "react-i18next";
import TagList from "../components/Blog/TagList";
import { useGetBlogByIdQuery } from "../redux/api/blogApi";
import RecommendBlog from "../components/Blog/RecommendBlog";
import moment from "moment";

const tags = [
  "#React",
  "#Tailwind",
  "#PHP",
  "#AntDesign",
  "#Redux",
  "#TypeScript",
  "#GraphQL",
  "#Node.js",
  "#Express",
];

const BlogDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Hàm điều hướng

  // Gọi API lấy dữ liệu blog theo ID
  const { data: blog, error, isLoading } = useGetBlogByIdQuery(id);

  const handleTagClick = (tag) => {
    const tagWithoutHash = tag.replace("#", "").trim(); // Xử lý tag
    navigate(`/blog#${tagWithoutHash}`); // Điều hướng theo tag
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="p-4 text-center text-xl text-red-500">
        {t("blogPage.notFound")}
      </div>
    );
  }

  return (
    <Layout>
      <section className="flex blog justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full p-4 sm:p-6 lg:p-8">
          {/* Back Button */}
          <div className="mb-6 flex justify-start">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              {t("blogPage.back")}
            </button>
          </div>

          {/* Blog Content */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              {blog.data.title}
            </h1>

            <div className="mb-6 text-gray-600">
              <p>
                <strong className="font-semibold">Ngày đăng:</strong>{" "}
                {moment(blog.data.create_at).format("DD/MM/YYYY")}
              </p>
            </div>

            <div className="mb-8">
              <img
                src={blog.data.thumbnail_image}
                alt={blog.data.title}
                className="w-full h-[800px] object-cover rounded-lg"
              />
            </div>

            {/* Render content với HTML */}
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg text-gray-800"
              dangerouslySetInnerHTML={{ __html: blog.data.content }}
            ></div>
          </div>

          <div>
            <div className="lg:col-span-1">
              <TagList tags={tags} onTagClick={handleTagClick} />
            </div>
          </div>

          <div>
            {/* Suggested Blogs */}
            <RecommendBlog blogs={[]} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetailPage;
