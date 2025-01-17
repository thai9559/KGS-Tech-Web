import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
const TestBlog = lazy(() => import("./pages/admin/Blog/CreateBlog"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/business" element={<Business />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/admin/login" element={<Login />} />

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
            <Route path="blog/create-blog" element={<TestBlog />} />
            <Route path="blog/categories" element={<CategoryAdmin />} />

            {/* Feedback Management */}
            <Route path="feedback" element={<FeedbackAdmin />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
