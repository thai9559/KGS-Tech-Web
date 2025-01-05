import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const Slider = lazy(() => import("react-slick")); // Lazy load Slider component

const BlogSliderData = [
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

const BlogSlider = () => {
  const { t, i18n } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const locale = i18n.language;
    return date.toLocaleDateString(locale, options);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
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

      <h2 className="text-3xl text-primary font-bold font-notoSansJP text-center  mb-6">
        {t("blogData.latest_posts")}
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Slider {...settings}>
          {BlogSliderData.map((blog) => (
            <div key={blog.id} className="px-4 lg:px-6">
              <div className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-lg hover:shadow-blue-500">
                <img
                  className="w-full h-56 object-cover"
                  src={blog.imageUrl}
                  alt={blog.title}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 font-beVietnam hover:text-indigo-600 transition duration-300">
                    {t(blog.titleKey)}
                  </h3>
                  <p className="mt-2 text-gray-600">{t(blog.descriptionKey)}</p>
                  <p className="mt-4 text-sm text-gray-500 italic">
                    {t("blogData.date_label")} {formatDate(blog.date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Suspense>
    </div>
  );
};

export default BlogSlider;
