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
const NoAccess = lazy(() => import("./pages/admin/NoAccess"));
const CreteBlog = lazy(() => import("./pages/admin/Blog/CreateBlog"));
const EditBlog = lazy(() => import("./pages/admin/Blog/EditBlog"));
const TagAdmin = lazy(() => import("./pages/admin/Blog/Tag/TagAdmin"));
const RecruitmentManagement = lazy(() =>
  import("./pages/admin/Recruitment/RecruitmentManagement")
);

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Danh sách các đường dẫn thuộc PrivateRoute
  const privateRoutes = [
    "/admin",
    "/admin/dashboard",
    "/admin/userlist",
    "/admin/users/roles",
    "/admin/company",
    "/admin/bloglist",
    "/admin/blog/categories",
    "/admin/feedback",
    "/admin/recruiment",
  ];
  const excludeLoadingRoutes = ["/blogs"];

  useEffect(() => {
    // Kiểm tra xem đường dẫn hiện tại có cần loading hay không
    const isExcluded = excludeLoadingRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    const isPrivateRoute = privateRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    // Nếu là PrivateRoute hoặc đường dẫn trong excludeLoadingRoutes, không hiển thị loading
    if (isPrivateRoute || isExcluded) {
      setLoading(false);
    } else {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500); // Thời gian loading (nếu cần)

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

            {/* Test */}

            {/* <Route path="blog/create-blog" element={<TestBlog />} /> */}
            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredPermissions={["Dashboard"]}>
                  <MenuNavigate />
                </PrivateRoute>
              }
            >
              {/* Dashboard */}
              <Route
                path="dashboard"
                element={
                  <PrivateRoute requiredPermissions={["Dashboard"]}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Users Management */}
              <Route
                path="userlist"
                element={
                  <PrivateRoute requiredPermissions={["Users"]}>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="users/roles"
                element={
                  <PrivateRoute requiredPermissions={["Users"]}>
                    <RoleAdmin />
                  </PrivateRoute>
                }
              />

              {/* Company Management */}
              <Route
                path="company"
                element={
                  <PrivateRoute requiredPermissions={["Company"]}>
                    <CompanyAdmin />
                  </PrivateRoute>
                }
              />

              {/* Blog Management */}
              <Route
                path="bloglist"
                element={
                  <PrivateRoute requiredPermissions={["Blogs"]}>
                    <BlogAdmin />
                  </PrivateRoute>
                }
              />

              <Route
                path="blog/create-blog"
                element={
                  <PrivateRoute requiredPermissions={["Blogs"]}>
                    <CreteBlog />
                  </PrivateRoute>
                }
              />

              <Route
                path="blog/edit-blog/:id" // Route con cho chỉnh sửa blog
                element={
                  <PrivateRoute requiredPermissions={["Blogs"]}>
                    <EditBlog />
                  </PrivateRoute>
                }
              />
              <Route
                path="blog/categories"
                element={
                  <PrivateRoute requiredPermissions={["Blogs"]}>
                    <CategoryAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="blog/tags"
                element={
                  <PrivateRoute requiredPermissions={["Blogs"]}>
                    <TagAdmin />
                  </PrivateRoute>
                }
              />

              {/* Feedback Management */}
              <Route
                path="feedback"
                element={
                  <PrivateRoute requiredPermissions={["Feedback"]}>
                    <FeedbackAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="recruiment"
                element={
                  <PrivateRoute requiredPermissions={["Recruiment"]}>
                    <RecruitmentManagement />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* No Access Route */}
            <Route path="/no-access" element={<NoAccess />} />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
