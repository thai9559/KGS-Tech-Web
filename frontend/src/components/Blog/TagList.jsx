// import React from "react";
// import PropTypes from "prop-types";

// const TagList = ({ tags, onTagClick }) => {
//   return (
//     <div className="flex flex-wrap gap-3 mt-4 justify-start items-center max-w-full">
//       {tags.map((tag, index) => (
//         <span
//           key={index}
//           className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full text-sm cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
//           onClick={() => onTagClick(tag)}
//         >
//           {tag}
//         </span>
//       ))}
//     </div>
//   );
// };

// TagList.propTypes = {
//   tags: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onTagClick: PropTypes.func.isRequired,
// };

// export default TagList;
import React from "react";
import PropTypes from "prop-types";

const TagList = ({ tags, onTagClick }) => {
  if (tags.length === 0) {
    return <p>No tags available.</p>; // Hiển thị thông báo khi không có tag
  }

  return (
    <div className="flex flex-wrap gap-3 mt-4 justify-start items-center max-w-full">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full text-sm cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired, // Đảm bảo `tags` là mảng chuỗi
  onTagClick: PropTypes.func.isRequired,
};

export default TagList;
