import React from "react";

/**
 * Component xem trước bài viết trên Google SEO
 * @param {string} title - Tiêu đề của bài viết
 * @param {string} description - Mô tả meta của bài viết
 * @param {string} url - URL canonical của bài viết
 * @param {string} thumbnail - URL của ảnh tiêu đề
 */
const GooglePreview = ({ title, description, url, thumbnail }) => {
  return (
    <div className="google-preview bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      {/* Logo và tên website */}
      <div className="flex items-center gap-2 mb-2">
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span className="text-gray-700 font-medium text-sm">KGS Tech</span>
      </div>

      {/* Tiêu đề bài viết */}
      <div className="title text-blue-700 text-base font-medium leading-snug mb-1">
        {title || "Tiêu đề bài viết sẽ hiển thị tại đây"}
      </div>

      {/* URL hiển thị */}
      <div className="url text-sm text-gray-500 mb-2">
        {url || "https://example.com"}
      </div>

      {/* Mô tả bài viết */}
      <div className="description text-gray-600 text-sm">
        {description ||
          "Phần mô tả bài viết sẽ hiển thị tại đây dưới dạng meta description."}
      </div>
    </div>
  );
};

export default GooglePreview;
