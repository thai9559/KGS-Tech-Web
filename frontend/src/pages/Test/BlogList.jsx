import React from "react";
import { useGetBlogsQuery } from "../../redux/api/blogApi";

const BlogList = () => {
  const { data, error, isLoading } = useGetBlogsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching blogs:", error);
    return <div>Error: {error.message}</div>;
  }

  console.log("Fetched blogs:", data);

  return (
    <div>
      <h1>Blog List</h1>
      {data?.data?.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
