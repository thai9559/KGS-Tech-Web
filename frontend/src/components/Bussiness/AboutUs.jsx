import React from "react";

function AboutUs({ title, description, image }) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6">
        {/* Phần text */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold font-notoSansJP text-gray-800">
            {title || "About Our Company"}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {description ||
              "We are a leading IT company dedicated to delivering innovative solutions that transform businesses and enhance productivity. Our mission is to empower organizations through state-of-the-art technology."}
          </p>
          {/* Điểm nhấn */}
          <p className="text-md text-blue-600 font-semibold">
            "Innovating Today for a Smarter Tomorrow"
          </p>
          {/* Nút CTA */}
          <div className="space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
              Learn More
            </button>
            <button className="px-6 py-3 bg-transparent border border-blue-600 text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-600 hover:text-white">
              Contact Us
            </button>
          </div>
        </div>

        {/* Phần ảnh */}
        <div className="relative">
          <img
            src={image || "https://via.placeholder.com/500"}
            alt="About Us Illustration"
            className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          {/* Text nổi bật trên hình ảnh */}
          <div className="absolute top-0 left-0 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-tr-lg rounded-bl-lg">
            Trusted by 100+ Companies
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
