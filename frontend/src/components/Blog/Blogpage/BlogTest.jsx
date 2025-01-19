import React from "react";
import FeaturedBlog from "./FeaturedBlog";
import PopularBlog from "./PopularBlog";
import SuggestedBlogs from "./SuggestedBlogs";
import Subscribe from "./Subscribe";
import SuccessStories from "./SuccessStories";
import CallToAction from "./CallToAction";
import UpcomingEvents from "./UpcomingEvents";
const BlogTest = ({ blogs, suggestedBlogs }) => {
  return (
    <div className="py-10 w-full ">
      {/* Popular Blogs */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <PopularBlog blogs={blogs} />
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full  py-10">
        <div className="w-full mx-auto ">
          <SuccessStories />
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="w-full bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <FeaturedBlog blogs={blogs} />
        </div>
      </section>

      {/* Suggested Blogs */}
      {/* <section className="w-full bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <SuggestedBlogs blogs={suggestedBlogs} />
        </div>
      </section> */}
      <section className="w-full py-10">
        <UpcomingEvents />
      </section>
      {/* Subscribe Section */}

      <section className="w-full py-10">
        <Subscribe />
      </section>
    </div>
  );
};

export default BlogTest;
