import React, { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsLoading(true); // Hiển thị trạng thái loading
      setTimeout(() => {
        setIsSubmitted(true); // Xác nhận đăng ký thành công
        setIsLoading(false);
        setTimeout(() => setIsSubmitted(false), 3000); // Tự động ẩn thông báo sau 3 giây
        setEmail(""); // Xóa nội dung input
      }, 1500); // Giả lập thời gian xử lý
    }
  };

  return (
    <section className="bg-gradient-to-r mt-10 from-blue-500 to-indigo-500 py-10 px-6 rounded-lg shadow-lg">
      <div className="max-w-3xl mx-auto text-center">
        {/* Hình minh họa */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3820/3820331.png"
          alt="Subscribe Illustration"
          className="mx-auto w-20 mb-4"
        />

        {/* Tiêu đề và mô tả */}
        <h2 className="text-3xl font-semibold text-white mb-4">
          Stay Updated with Our Latest Blogs
        </h2>
        <p className="text-white text-lg mb-6">
          Subscribe to our newsletter and never miss any updates.
        </p>

        {/* Input và nút */}
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full sm:w-auto px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md text-gray-800"
          />
          <button
            onClick={handleSubscribe}
            className="mt-3 sm:mt-0 sm:ml-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {/* Thông báo thành công */}
        {isSubmitted && (
          <p className="mt-4 text-green-300 font-medium">
            Subscription successful! 🎉
          </p>
        )}

        {/* Chính sách bảo mật */}
        <p className="text-sm text-gray-200 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Subscribe;
