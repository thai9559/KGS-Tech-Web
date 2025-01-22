import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Component xem trước bài viết trên Google SEO
 * @param {string} title
 * @param {string} description
 * @param {string} url
 * @param {string} thumbnail
 */
const GooglePreview = ({ title, description, url, thumbnail }) => {
  const { t } = useTranslation();
  return (
    <div className="google-preview bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={t("create_blog.thumbnail_image")}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span className="text-gray-700 font-medium text-sm">KGS Tech</span>
      </div>
      {/* Tiêu đề bài viết */}
      <div className="title text-blue-700 text-base font-medium leading-snug mb-1">
        {title || t("create_blog.placeholder.title")}
      </div>

      {/* URL hiển thị */}
      <div className="url text-sm text-gray-500 mb-2">
        {url || t("create_blog.placeholder.canonical_url")}
      </div>

      {/* Mô tả bài viết */}
      <div className="description text-gray-600 text-sm">
        {description || t("create_blog.placeholder.meta_description")}
      </div>
    </div>
  );
};

export default GooglePreview;
