import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const BlogData = [
  {
    id: 1,
    titleKey: "blogData.post1.title",
    descriptionKey: "blogData.post1.description",
    imageUrl:
      "https://i.pinimg.com/736x/86/0a/fd/860afd97e98a5ac0d8c1dcc9087ff4b1.jpg",
    date: "2024-12-20",
  },
  {
    id: 2,
    titleKey: "blogData.post2.title",
    descriptionKey: "blogData.post2.description",
    imageUrl:
      "https://i.pinimg.com/736x/52/53/3f/52533fd8f3742503453bd849769f7e1f.jpg",
    date: "2024-12-22",
  },
  {
    id: 3,
    titleKey: "blogData.post3.title",
    descriptionKey: "blogData.post3.description",
    imageUrl:
      "https://i.pinimg.com/736x/df/8a/8e/df8a8ec01f58e4933ebf96734d878b07.jpg",
    date: "2024-12-25",
  },
  {
    id: 4,
    titleKey: "blogData.post4.title",
    descriptionKey: "blogData.post4.description",
    imageUrl:
      "https://i.pinimg.com/736x/19/01/a7/1901a7994208a372544c486071edfb98.jpg",
    date: "2024-12-30",
  },
];

const BlogList = () => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const locale = i18n.language;
    return date.toLocaleDateString(locale, options);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 mb-10 sm:px-6 lg:px-8 shadow-lg">
      <Helmet>
        <title>{"KGS Tech"}</title>
        <meta name="description" content={t("seo.blogSlider.description")} />
        <meta property="og:title" content={t("blogData.latest_posts")} />
        <meta
          property="og:description"
          content={t("seo.blogSlider.description")}
        />
        <meta
          property="og:image"
          content="https://i.pinimg.com/736x/86/0a/fd/860afd97e98a5ac0d8c1dcc9087ff4b1.jpg"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <h2 className="text-3xl text-black font-bold font-notoSansJP text-center mb-4">
        {t("blogData.latest_posts")}
      </h2>

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4">
        {/* Main Blog (Image on Top) */}
        <div className="w-full lg:w-7/10">
          <div className="bg-white cursor-pointer overflow-hidden rounded-lg">
            <div className="flex flex-col items-center p-3">
              <div className="w-full">
                <img
                  className="w-full h-60 object-cover"
                  src={BlogData[0].imageUrl}
                  alt={BlogData[0].title}
                />
              </div>
              <div className="w-full p-3 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-gray-900 font-beVietnam hover:text-indigo-600 transition duration-300">
                  {t(BlogData[0].titleKey)}
                </h3>
                <p className="mt-2 text-gray-600">{t(BlogData[0].descriptionKey)}</p>
                <p className="mt-2 text-sm text-gray-500 italic">
                  {t("blogData.date_label")} {formatDate(BlogData[0].date)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List (Full Width on Mobile, 30% on Large Screens) */}
        <div className="w-full lg:w-3/10 flex flex-col space-y-4">
          {BlogData.slice(1).map((blog) => (
            <div
              key={blog.id}
              className="bg-white cursor-pointer overflow-hidden rounded-lg p-3"
            >
              <div className="flex flex-row space-x-3">
                <div className="w-1/4">
                  <img
                    className="w-full h-20 object-cover"
                    src={blog.imageUrl}
                    alt={blog.title}
                  />
                </div>
                <div className="w-3/4">
                  <h3 className="text-lg font-bold text-gray-900 font-beVietnam hover:text-indigo-600 transition duration-300">
                    {t(blog.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 italic">
                    {t("blogData.date_label")} {formatDate(blog.date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
