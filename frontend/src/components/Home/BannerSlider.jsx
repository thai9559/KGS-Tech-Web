import React from "react";
import Slider from "react-slick";
import { useGetBlogsQuery } from "../../redux/api/blogApi";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const { data, isLoading, error } = useGetBlogsQuery();
  const navigate = useNavigate();

  // Lọc các blog có is_visible = true
  const visibleBlogs = data?.data?.filter((blog) => blog.is_visible) || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;
  }

  return (
    <section className="w-full p-2 rounded-lg mx-auto relative">
      <Slider {...settings}>
        {visibleBlogs.map((blog) => (
          <div key={blog.id} className="relative rounded-lg">
            {/* Hiển thị ảnh thumbnail */}
            <img
              src={blog.thumbnail_image}
              alt={blog.title}
              className="w-full h-[450px] md:h-[94vh] rounded-lg object-cover"
            />
            {/* Overlay thông tin */}
            <div className="absolute rounded-lg inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-6">
              <h2 className="text-xl md:text-3xl font-bold">{blog.title}</h2>
              <p className="text-sm md:text-base mt-2 max-w-[80%]">
                {blog.meta_description}
              </p>
              <span className="text-xs md:text-sm mt-1">
                {new Date(blog.created_at).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              {/* Nút Xem Ngay */}
              <button
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm md:text-base"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Xem ngay
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default BannerSlider;
