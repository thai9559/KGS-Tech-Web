// import React from "react";
// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import moment from "moment"; // Import moment

// const BlogList = ({ blogs }) => {
//   const navigate = useNavigate();

//   const handleBlogClick = (id) => {
//     navigate(`/blog/${id}`);
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {blogs.map((blog, index) => (
//         <div
//           key={index}
//           className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
//           onClick={() => handleBlogClick(blog.id)} // Redirect to detail page on blog click
//         >
//           {/* Blog Image */}
//           <div className="relative w-full h-48">
//             <img
//               src={
//                 blog.thumbnail_image ||
//                 "https://via.placeholder.com/800x400?text=Blog+Image"
//               }
//               alt={blog.title}
//               className="w-full h-full object-cover"
//             />
//             {/* Overlay with dark transparent background */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
//           </div>

//           <div className="p-4">
//             {/* Title */}
//             <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300 line-clamp-1">
//               {blog.title}
//             </h3>

//             {/* Date */}
//             <p className="text-sm text-gray-500 mb-4">
//               {moment(blog.create_at).format("DD/MM/YYYY")} {/* Format ngày */}
//             </p>

//             <p className="text-black text-sm">{blog.tags}</p>

//             {/* Description */}
//             <p className="text-sm text-gray-700 mb-4 line-clamp-2">
//               {blog.meta_description ||
//                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a eros urna. Vivamus et efficitur nunc."}
//             </p>

//             {/* Button - View more */}
//             <Button
//               type="primary"
//               className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-500"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent redirect from card click
//                 window.open(blog.link, "_blank");
//               }}
//             >
//               {blog.canonical_url ? "Xem thêm" : "Không có link"}
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogList;
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Import moment

const BlogList = ({ blogs }) => {
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleTagClick = (tag) => {
    // Handle tag click (e.g., navigate to the tag filter page or update the search)
    console.log(`Tag clicked: ${tag}`);
  };

  const parseTags = (tags) => {
    // Check if tags is a string that needs to be parsed into an array
    if (typeof tags === "string") {
      try {
        return JSON.parse(tags); // Parse the string into an array if possible
      } catch (e) {
        console.error("Error parsing tags:", e);
        return []; // Return an empty array if parsing fails
      }
    }
    return tags || []; // Return tags if it's already an array, or an empty array if not available
  };

  // If blogs data is not available or is empty, show an error message
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-lg text-red-600">
          Không lấy được dữ liệu từ server.
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
          onClick={() => handleBlogClick(blog.id)} // Redirect to detail page on blog click
        >
          {/* Blog Image */}
          <div className="relative w-full h-48">
            <img
              src={
                blog.thumbnail_image ||
                "https://via.placeholder.com/800x400?text=Blog+Image"
              }
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay with dark transparent background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
          </div>

          <div className="p-4">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300 line-clamp-1">
              {blog.title}
            </h3>

            {/* Date */}
            <p className="text-sm text-gray-500 mb-4">
              {moment(blog.created_at).format("DD/MM/YYYY")} {/* Format date */}
            </p>

            {/* Tags as buttons */}
            <div className="mb-4">
              {parseTags(blog.tags).map((tag, idx) => (
                <Button
                  key={idx}
                  type="default"
                  className="mr-2 mb-2 px-3 py-1 text-sm rounded-full border hover:bg-blue-500 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleTagClick(tag);
                  }}
                >
                  {tag}
                </Button>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {blog.meta_description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a eros urna. Vivamus et efficitur nunc."}
            </p>

            {/* Button - View more */}
            <Button
              type="primary"
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-500"
              onClick={(e) => {
                e.stopPropagation(); // Prevent redirect from card click
                window.open(blog.canonical_url, "_blank");
              }}
            >
              {blog.canonical_url ? "Xem thêm" : "Không có link"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
