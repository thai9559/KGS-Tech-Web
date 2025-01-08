import React ,{useState}from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SuggestedBlogs from '../components/Blog/SuggestedBlogs';
import { useTranslation } from 'react-i18next';
import TagList from '../components/Blog/TagList';
import RecommendBlog from '../components/Blog/RecommendBlog';
const tags = ["#React", "#Tailwind", "#PHP", "#AntDesign", "#Redux", "#TypeScript", "#GraphQL", "#Node.js", "#Express"];
const blogs = [
  {
    id: 1,
    title: "Giới thiệu ReactJS",
    description:
      "ReactJS là một thư viện JavaScript mạnh mẽ dùng để xây dựng UI. Nó cho phép bạn tạo ra các component có thể tái sử dụng, giúp tối ưu hóa quá trình phát triển ứng dụng web. Với ReactJS, bạn sẽ có thể quản lý trạng thái của ứng dụng dễ dàng hơn, đồng thời tối ưu hóa hiệu suất render bằng cách sử dụng các lifecycle methods.",
    date: "2025-01-01",
    link: "#",
    image: "https://i.pinimg.com/736x/d6/b1/3a/d6b13ac0a7ab3e66e32db5124bc1e890.jpg",
    category: "react",
    content: `ReactJS là một thư viện JavaScript được phát triển bởi Facebook. Nó cho phép bạn xây dựng giao diện người dùng (UI) cho các ứng dụng web một cách dễ dàng và hiệu quả. Với ReactJS, bạn có thể tạo ra các component có thể tái sử dụng và kết hợp lại với nhau để tạo thành một ứng dụng phức tạp.

    ReactJS giúp bạn quản lý trạng thái của ứng dụng thông qua các hook và state management. Bằng cách sử dụng các lifecycle methods, React có thể tối ưu hóa hiệu suất render, chỉ cập nhật các phần của giao diện khi cần thiết. Điều này giúp giảm thiểu sự lãng phí tài nguyên và mang lại trải nghiệm người dùng mượt mà hơn.

    Một điểm mạnh của ReactJS là khả năng tái sử dụng các component. Bạn có thể xây dựng một lần và tái sử dụng chúng nhiều lần trong các phần khác nhau của ứng dụng, giúp giảm thiểu mã lặp lại và làm cho việc bảo trì trở nên dễ dàng hơn.`
  },
  {
    id: 2,
    title: "Hướng dẫn Tailwind CSS",
    description:
      "Tailwind CSS giúp bạn thiết kế giao diện đẹp mắt và nhanh chóng mà không cần phải viết nhiều mã CSS. Nó sử dụng các utility classes để bạn có thể tạo các component với cấu trúc và kiểu dáng tùy chỉnh. Với Tailwind CSS, bạn không phải lo lắng về việc phải thêm nhiều class trong HTML mà vẫn có thể điều chỉnh giao diện dễ dàng chỉ bằng cách thay đổi lớp utility.",
    date: "2025-02-01",
    link: "#",
    image: "https://i.pinimg.com/736x/7a/e2/ac/7ae2ac4c081037f9ebcb958cc25a75d3.jpg",
    category: "tailwind",
    content: `Tailwind CSS là một framework CSS giúp bạn tạo ra giao diện người dùng đẹp mắt mà không phải viết nhiều mã CSS. Thay vì phải tạo ra các class tùy chỉnh, bạn có thể sử dụng các lớp utility được cung cấp sẵn để áp dụng các kiểu dáng cho các phần tử HTML.

    Điều này giúp giảm thiểu việc phải tạo các class tùy chỉnh và làm cho việc thiết kế trở nên nhanh chóng hơn. Bạn chỉ cần sử dụng các utility classes như 'text-center', 'bg-red-500', 'p-4', v.v., để thay đổi giao diện của các phần tử mà không cần phải lo lắng về CSS phức tạp.

    Tailwind CSS giúp bạn dễ dàng tùy chỉnh giao diện của mình mà không cần phải thêm nhiều class trong HTML, giúp bạn tiết kiệm thời gian và tăng hiệu quả khi phát triển giao diện ứng dụng.`
  },
  {
    id: 3,
    title: "Làm việc với Ant Design",
    description:
      "Ant Design là một thư viện UI mạnh mẽ giúp bạn tạo ra các giao diện người dùng chuyên nghiệp và nhất quán cho ứng dụng web của mình. Với Ant Design, bạn có thể dễ dàng sử dụng các component như Form, Table, Button, Modal, và nhiều thành phần khác mà không cần phải tạo từ đầu. Thư viện này giúp tiết kiệm thời gian phát triển và mang lại giao diện đẹp mắt và thân thiện với người dùng.",
    date: "2025-03-01",
    link: "#",
    image: "https://i.pinimg.com/736x/9e/5c/66/9e5c66a5a45ebd53216267dd39c963c2.jpg",
    category: "antd",
    content: `Ant Design là một framework CSS giúp bạn tạo ra giao diện người dùng đẹp mắt mà không phải viết nhiều mã CSS. Thay vì phải tạo ra các class tùy chỉnh, bạn có thể sử dụng các lớp utility được cung cấp sẵn để áp dụng các kiểu dáng cho các phần tử HTML.
            Điều này giúp giảm thiểu việc phải tạo các class tùy chỉnh và làm cho việc thiết kế trở nên nhanh chóng hơn. Bạn chỉ cần sử dụng các utility classes như 'text-center', 'bg-red-500', 'p-4', v.v., để thay đổi giao diện của các phần tử mà không cần phải lo lắng về CSS phức tạp.
            Tailwind CSS giúp bạn dễ dàng tùy chỉnh giao diện của mình mà không cần phải thêm nhiều class trong HTML, giúp bạn tiết kiệm thời gian và tăng hiệu quả khi phát triển giao diện ứng dụng.`
  },
  {
    id: 4,
    title: "Giới thiệu về Redux trong React",
    description:
      "Redux là một thư viện quản lý trạng thái (state) phổ biến trong các ứng dụng React. Nó cung cấp một cách tiếp cận trung tâm để quản lý dữ liệu và giúp việc truyền tải dữ liệu giữa các component trở nên đơn giản hơn. Bài viết này sẽ giúp bạn hiểu rõ cách thức Redux hoạt động và cách bạn có thể sử dụng Redux để quản lý trạng thái trong ứng dụng của mình.",
    date: "2025-04-01",
    link: "#",
    image: "https://i.pinimg.com/736x/63/f6/dc/63f6dc556fa718104e2b368195edec47.jpg",
    category: "react",
    content: 'Redux'
  },
  {
    id: 5,
    title: "Sử dụng PHP để phát triển ứng dụng Web",
    description:
      "PHP là một ngôn ngữ lập trình phổ biến để phát triển các ứng dụng web động. Bài viết này sẽ hướng dẫn bạn cách sử dụng PHP để tạo ra các trang web động, kết nối với cơ sở dữ liệu, xử lý biểu mẫu, và triển khai các tính năng bảo mật như xác thực người dùng. Bạn cũng sẽ tìm hiểu cách tích hợp PHP với các framework phổ biến như Laravel để tăng hiệu suất và bảo mật cho ứng dụng của mình.",
    date: "2025-05-01",
    link: "#",
    image: "https://i.pinimg.com/736x/89/42/a3/8942a3efa41766673a570922fee55f61.jpg",
    category: "php",
    content: 'PHP'
  },
  {
    id: 6,
    title: "Cách sử dụng TypeScript trong React",
    description:
      "TypeScript giúp bạn tránh được các lỗi thường gặp khi phát triển ứng dụng React bằng cách cung cấp các tính năng mạnh mẽ như kiểm tra kiểu (type checking) và tự động hoàn thành (autocompletion). Bài viết này sẽ giúp bạn hiểu rõ cách cấu hình TypeScript trong một dự án React và cách sử dụng các tính năng của nó để phát triển ứng dụng hiệu quả hơn.",
    date: "2025-06-01",
    link: "#",
    image: "https://i.pinimg.com/736x/8c/0a/b3/8c0ab3baec0ebc6cfbad22cbe206d0cd.jpg",
    category: "react",
    content: 'TypeScript'
  },
  {
    id: 7,
    title: "Kết hợp GraphQL với React",
    description:
      "GraphQL là một ngôn ngữ truy vấn mạnh mẽ giúp bạn lấy dữ liệu từ server một cách linh hoạt và hiệu quả. Trong bài viết này, bạn sẽ tìm hiểu cách kết hợp GraphQL với React để xây dựng các ứng dụng web hiện đại, tận dụng các lợi ích của GraphQL như giảm bớt số lượng yêu cầu HTTP và tối ưu hóa dữ liệu.",
    date: "2025-07-01",
    link: "#",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtvRw50zCCRM2pxEB8pdMKHMJAUSknK1GqGw&s",
    category: "react",
    content: 'GraphQL'
  },
  {
    id: 8,
    title: "Các mẹo tối ưu hóa hiệu suất với React",
    description:
      "React cung cấp nhiều công cụ và kỹ thuật giúp bạn tối ưu hóa hiệu suất ứng dụng. Trong bài viết này, chúng tôi sẽ hướng dẫn bạn các phương pháp như sử dụng React.memo, lazy loading, code splitting, và tối ưu hóa các render để giảm thiểu thời gian tải trang và cải thiện trải nghiệm người dùng.",
    date: "2025-08-01",
    link: "#",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1RYoQCOaQWF5TtTboAfSHSR5quxzDmj6_uAsA7GR7jpUgxpfcO__hFTZ6KZmayL4oE74&usqp=CAU",
    category: "react",
    content: 'React'
  },
  {
    id: 9,
    title: "Xây dựng API với Node.js và Express",
    description:
      "Node.js và Express là một cặp đôi mạnh mẽ để phát triển các API server-side. Bài viết này sẽ giúp bạn học cách xây dựng một API RESTful sử dụng Node.js và Express, đồng thời hướng dẫn bạn cách xử lý yêu cầu HTTP, kết nối với cơ sở dữ liệu, và triển khai ứng dụng vào môi trường sản xuất.",
    date: "2025-09-01",
    link: "#",
    image: "https://kb.pavietnam.vn/wp-content/uploads/2021/08/nodejs-logo.png",
    category: "nodejs",
    content: 'Node.js'
  },
];
const suggestedBlogs = [
  { title: "Tìm hiểu về Hooks trong React", link: "#" },
  { title: "Cách sử dụng Context API", link: "#" },
  { title: "Thiết kế giao diện với Material-UI", link: "#" },
  { title: "Làm việc với Laravel trong PHP", link: "#" },
  { title: "Ứng dụng thực tế của Tailwind CSS", link: "#" },
];


const BlogDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Lấy id từ URL
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hàm điều hướng
  const blog = blogs.find((b) => b.id === parseInt(id)); // Tìm blog theo id

  const relatedBlogs = blogs.filter((b) => b.id !== parseInt(id));
  const randomBlogs = [...relatedBlogs]; // Copy mảng blogs
  randomBlogs.sort(() => Math.random() - 0.5); // Trộn ngẫu nhiên
  const randomSixBlogs = randomBlogs.slice(0, 6); // Lấy 6 bài đầu tiên
  
  const handleTagClick = (tag) => {
    const tagWithoutHash = tag.replace("#", "").trim();  // Clean the tag by removing '#' and extra spaces
    setSearchTerm(tagWithoutHash);  // Set the search term (optional depending on your usage)
    console.log(tagWithoutHash)
    navigate(`/blog#${tagWithoutHash}`);  // Navigate to the URL with the tag
  };
  

  if (!blog) {
    return (
      <div className="p-4 text-center text-xl text-red-500">Blog không tồn tại.</div>
    );
  }

  return (
    <Layout>
      <div className="flex blog justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full  p-4 sm:p-6 lg:p-8  ">
          {/* Back Button */}
          <div className="mb-6 flex justify-start">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              {t('blogPage.back')}
            </button>
          </div>

          {/* Blog Content */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              {blog.title}
            </h1>

            <div className="mb-6 text-gray-600">
              <p>
                <strong className="font-semibold">Ngày đăng:</strong> {blog.date}
              </p>
            </div>

            <div className="mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[800px] object-cover rounded-lg"
              />
            </div>

            <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-800">
              <p>{blog.content}</p>
            </div>
          </div>
          <div>
          <div className="lg:col-span-1">
            <TagList tags={tags} onTagClick={handleTagClick} />
          </div>
          </div>

          <div>
            {/* Suggested Blogs */}
            <RecommendBlog blogs={randomSixBlogs} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetailPage;
