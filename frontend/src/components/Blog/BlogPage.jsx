import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import SuggestedBlogs from "./SuggestedBlogs";
import { Input, Select, Button, Spin } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import moment from "moment";
import TagList from "./TagList"; // Import TagList component
import { useTranslation } from "react-i18next";

const { Option } = Select;

const BlogPage = ({ blogs, suggestedBlogs }) => {
  const { t } = useTranslation(); // Lấy hàm dịch từ i18n
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const blogsPerPage = 8;

  // Lắng nghe sự thay đổi của hash trong URL và cập nhật searchTerm
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setSearchTerm(hash); // Nếu có hash, cập nhật searchTerm
    }
  }, []); // Chỉ chạy 1 lần khi component mount

  // Handle search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  // Handle date change
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedDate(null);
    setSortOrder("asc");
  };

  // Handle tag click (update search term and URL)
  const handleTagClick = (tag) => {
    const tagWithoutHash = tag.replace("#", "").trim();
    setSearchTerm(tagWithoutHash);
    window.location.hash = tag;
  };

  // Filtering the blogs
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

  // Sorting blogs by date
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

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handling page change
  const handlePageChange = (page) => {
    setIsLoading(true); // Set loading to true
    setCurrentPage(page);
    const scrollOffset = window.innerWidth < 768 ? 200 : 0; // Adjust scroll offset for mobile
    window.scrollTo({ top: scrollOffset, behavior: "smooth" }); // Smooth scroll to adjusted position

    // Simulate an API call delay or fetching data (for demonstration purposes)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after loading
    }, 500); // Simulated loading delay
  };

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
      {/* Filters and sorting */}
      <div className="mb-6 flex flex-col lg:flex-row items-center justify-between w-full lg:w-3/4">
        <div className="flex flex-col lg:flex-row w-full lg:w-3/4 mb-4 lg:mb-0">
          <Select
            placeholder={t("blogPage.filter.category")}
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full lg:w-1/4 mr-0 lg:mr-5 mb-4 lg:mb-0"
          >
            <Option value="react">{t("blogPage.filter.react")}</Option>
            <Option value="tailwind">{t("blogPage.filter.tailwind")}</Option>
            <Option value="antd">{t("blogPage.filter.antd")}</Option>
          </Select>
          <Select
            placeholder={t("blogPage.filter.time")}
            value={selectedDate}
            onChange={handleDateChange}
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
            onChange={handleSortChange}
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
      <div className="lg:hidden mb-6">
        <TagList tags={tags} onTagClick={handleTagClick} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-2xl text-black font-bold mb-6">
            {t("blogList.title")}
          </h2>

          {/* Show loading spinner if data is loading */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <BlogList blogs={currentBlogs} />
          )}
        </div>

        <div>
          <SuggestedBlogs blogs={suggestedBlogs} />

          {/* TagList - Visible on PC, hidden on mobile */}
          <div className="hidden lg:block mt-6">
            <TagList tags={tags} onTagClick={handleTagClick} />
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 mb-12">
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
          >
            {t("blogPage.previous")}
          </Button>

          {/* Page Number Buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </Button>
          ))}

          {/* Next Button */}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
          >
            {t("blogPage.next")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
