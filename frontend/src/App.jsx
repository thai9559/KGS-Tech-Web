import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./components/Loading";
import PrivateRoute from "./pages/PriviteRoute/PrivateRoute";
// Lazy load các tran
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
const BlogAdmin = lazy(() => import("./pages/admin/BlogAdmin"));
const TestBlog = lazy(() => import("./pages/admin/CreateBlog"));

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
          <Route path="/test" element={<TestBlog />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          >
            <Route
              path="company"
              element={
                <PrivateRoute>
                  <CompanyAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="bloglist"
              element={
                <PrivateRoute>
                  <BlogAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="create-blog"
              element={
                <PrivateRoute>
                  <TestBlog />
                </PrivateRoute>
              }
            />
            <Route
              path="users"
              element={
                <PrivateRoute>
                  <UserManagement />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
