import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Loading from "./components/Loading";

// Lazy load các trang
const Home = lazy(() => import("./pages/Home"));
const Company = lazy(() => import("./pages/Company"));
const Business = lazy(() => import("./pages/Business"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const CompanyAdmin = lazy(() => import("./pages/admin/CompanyAdmin"));
const Menu = lazy(() => import("./components/Admin/MenuNavigate"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));




const TestBlog = lazy(() => import("./pages/Test/BlogList"));
// Hook xử lý loading với tiêu đề và favicon
const usePageLoading = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const originalTitle = "KGS Tech";
  const loadingIcons = ["◜", "◝", "◞", "◟"]; // Biểu tượng loading dạng vòng tròn

  useEffect(() => {
    setLoading(true);
    let index = 0;
    const interval = setInterval(() => {
      document.title = `${loadingIcons[index]} Loading...`; // Cập nhật title
      index = (index + 1) % loadingIcons.length; // Xoay vòng icon
    }, 50); // Đổi icon mỗi 200ms

    const timeout = setTimeout(() => {
      setLoading(false);
      document.title = originalTitle; // Quay lại tiêu đề mặc định
      clearInterval(interval); // Dừng interval
    }, 700); // Loading 1 giây

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      document.title = originalTitle;
    };
  }, [location.pathname]);

  return loading;
};

// Component bọc các route và hiển thị loading
const PageLoader = ({ children }) => {
  const loading = usePageLoading();
  return loading ? <Loading /> : children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <PageLoader>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/business" element={<Business />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/test" element={<TestBlog />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            {/* Layout chung cho các trang quản lý */}
            <Route path="/admin" element={<Menu />}>
              <Route path="company" element={<CompanyAdmin />} />
              <Route path="user" element={<UserManagement />} />
              {/* Các route quản lý khác */}
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageLoader>
      </Suspense>
    </Router>
  );
}

export default App;
