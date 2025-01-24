import React, { useState, useEffect, Suspense } from "react";
import { Input, Select, Button, Spin } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useGetTagsQuery } from "../../redux/api/TagApi";
import moment from "moment";

// Lazy load components
const BlogList = React.lazy(() => import("./BlogList"));
const SuggestedBlogs = React.lazy(() => import("./SuggestedBlogs"));
const TagList = React.lazy(() => import("./TagList"));

const { Option } = Select;

const BlogPage = ({ blogs, suggestedBlogs }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const blogsPerPage = 8;

  // Fetch tags from API
  const { data: tagsData, isLoading: isTagsLoading } = useGetTagsQuery();

  // Extract tag names
  const tags = Array.isArray(tagsData?.data)
    ? tagsData.data.map((tag) => tag.name)
    : [];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setSearchTerm(hash);
    }
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleTagClick = (tag) => {
    const tagWithoutHash = tag.replace("#", "").trim();
    setSearchTerm(tagWithoutHash);
    window.location.hash = tag;
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedDate(null);
    setSortOrder("asc");
  };

  const filteredBlogs = blogs.filter((blog) => {
    const isTitleMatch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isCategoryMatch = selectedCategory
      ? blog.category === selectedCategory
      : true;
    const isDateMatch = selectedDate
      ? moment(blog.date).isAfter(
          moment().subtract(parseInt(selectedDate), "months")
        )
      : true;
    return isTitleMatch && isCategoryMatch && isDateMatch;
  });

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    const dateA = moment(a.date);
    const dateB = moment(b.date);
    return sortOrder === "asc"
      ? dateA.isBefore(dateB)
        ? -1
        : 1
      : dateB.isBefore(dateA)
      ? -1
      : 1;
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    const scrollOffset = window.innerWidth < 768 ? 200 : 0;
    window.scrollTo({ top: scrollOffset, behavior: "smooth" });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto p-6 scroll-smooth">
      {/* Search bar */}
      <div className="mb-6 w-full lg:w-3/4">
        <Input
          placeholder={t("blogPage.search.placeholder")}
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="w-full h-10 py-2 text-base"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col lg:flex-row items-center justify-between w-full lg:w-3/4">
        <div className="flex flex-col lg:flex-row w-full lg:w-3/4 mb-4 lg:mb-0">
          <Select
            placeholder={t("blogPage.filter.category")}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            className="w-full lg:w-1/4 mr-0 lg:mr-5 mb-4 lg:mb-0"
          >
            <Option value="react">{t("blogPage.filter.react")}</Option>
            <Option value="tailwind">{t("blogPage.filter.tailwind")}</Option>
            <Option value="antd">{t("blogPage.filter.antd")}</Option>
          </Select>
          <Select
            placeholder={t("blogPage.filter.time")}
            value={selectedDate}
            onChange={(value) => setSelectedDate(value)}
            className="w-full lg:w-1/4 mb-4 lg:mb-0"
          >
            <Option value="1">{t("blogPage.filter.1month")}</Option>
            <Option value="3">{t("blogPage.filter.3months")}</Option>
            <Option value="6">{t("blogPage.filter.6months")}</Option>
            <Option value="12">{t("blogPage.filter.12months")}</Option>
          </Select>
        </div>

        <div className="flex flex-col lg:flex-row items-center w-full lg:w-1/4">
          <Select
            placeholder={t("blogPage.filter.sort")}
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
            className="w-full lg:w-1/2 mr-0 lg:mr-5 mb-4 lg:mb-0"
          >
            <Option value="asc">{t("blogPage.filter.newest")}</Option>
            <Option value="desc">{t("blogPage.filter.oldest")}</Option>
          </Select>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleResetFilters}
            shape="circle"
            className="text-xl"
          />
        </div>
      </div>

      {/* Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-2xl text-black font-bold mb-6">
            {t("blogList.title")}
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <Suspense fallback={<Spin size="large" />}>
              <BlogList blogs={blogs} />
            </Suspense>
          )}
        </div>

        {/* Suggested blogs */}
        <div>
          <Suspense fallback={<Spin size="large" />}>
            <SuggestedBlogs blogs={suggestedBlogs} />
          </Suspense>
          <div className="lg:hidden mb-6">
            <Suspense fallback={<Spin size="large" />}>
              {isTagsLoading ? (
                <Spin size="large" />
              ) : (
                <TagList tags={tags} onTagClick={handleTagClick} />
              )}
            </Suspense>
          </div>

          <div className="hidden lg:block mt-6">
            <Suspense fallback={<Spin size="large" />}>
              {isTagsLoading ? (
                <Spin size="large" />
              ) : (
                <TagList tags={tags} onTagClick={handleTagClick} />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
