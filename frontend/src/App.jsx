import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Loading from "./components/Loading";
import PrivateRoute from "./pages/PriviteRoute/PrivateRoute";
import BlogTest from "./components/Blog/Blogpage/BlogTest";
import Homepage from "./components/Home/Homepage/Homepage";

// Lazy load các trang
const Home = lazy(() => import("./pages/Home"));
const Company = lazy(() => import("./pages/Company"));
const Business = lazy(() => import("./pages/Business"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const CompanyAdmin = lazy(() => import("./pages/admin/Company/CompanyAdmin"));
const MenuNavigate = lazy(() => import("./components/Admin/MenuNavigate"));
const UserManagement = lazy(() => import("./pages/admin/Users/UserManagement"));
const BlogAdmin = lazy(() => import("./pages/admin/Blog/BlogAdmin"));
const RoleAdmin = lazy(() => import("./pages/admin/Users/RoleManagement"));
const FeedbackAdmin = lazy(() =>
  import("./pages/admin/Feedback/FeedbackManagement")
);
const CategoryAdmin = lazy(() =>
  import("./pages/admin/Category/CategoryManagement")
);
const TestBlog = lazy(() => import("./pages/admin/Blog/CreateBlog"));

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Danh sách ngoại lệ (không hiển thị loading)
  const exceptionRoutes = ["/admin/testtest", "/testtest"]; // Thêm đường dẫn cần bỏ qua

  useEffect(() => {
    // Nếu URL hiện tại nằm trong danh sách ngoại lệ, không hiển thị loading
    if (exceptionRoutes.includes(location.pathname)) {
      setLoading(false);
    } else {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500); // Set thời gian loading (nếu cần)

      return () => clearTimeout(timeout);
    }
  }, [location]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/business" element={<Business />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/admin/login" element={<Login />} />

            {/* test */}
            <Route path="blog/create-blog" element={<TestBlog />} />
            <Route path="blog/test" element={<BlogTest />} />
            <Route path="/homepage" element={<Homepage />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <MenuNavigate />
                </PrivateRoute>
              }
            >
              {/* Dashboard */}
              <Route path="dashboard" element={<Dashboard />} />

              {/* Users Management */}
              <Route path="users" element={<UserManagement />} />
              <Route path="users/roles" element={<RoleAdmin />} />

              {/* Company Management */}
              <Route path="company" element={<CompanyAdmin />} />

              {/* Blog Management */}
              <Route path="bloglist" element={<BlogAdmin />} />
              {/* <Route path="blog/create-blog" element={<TestBlog />} /> */}
              <Route path="blog/categories" element={<CategoryAdmin />} />

              {/* Feedback Management */}
              <Route path="feedback" element={<FeedbackAdmin />} />
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
