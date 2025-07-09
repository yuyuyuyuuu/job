import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { getCurrentUser } from './store/slices/authSlice';
import { RootState, AppDispatch } from './store';

// 布局组件
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';

// 页面组件
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Companies from './pages/Companies';
import CompanyDetail from './pages/CompanyDetail';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import Resume from './pages/Resume';
import Profile from './pages/Profile';
import Mentors from './pages/Mentors';
import CampusRecruitment from './pages/CampusRecruitment';
import ExamResources from './pages/ExamResources';
import Tools from './pages/Tools';
import NotFound from './pages/NotFound';

// 路由保护组件
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// 全局组件
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, token, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // 如果有token但用户未认证，尝试获取用户信息
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="App">
      <Helmet>
        <title>就业找工作资讯门户</title>
        <meta name="description" content="专业的就业找工作资讯门户，为毕业生提供全面的求职服务" />
        <meta name="keywords" content="就业,求职,招聘,工作,毕业生,校园招聘" />
      </Helmet>

      <Routes>
        {/* 公共路由 - 未登录时可访问 */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <AuthLayout>
                <Register />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* 主要路由 - 使用主布局 */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/jobs"
          element={
            <Layout>
              <Jobs />
            </Layout>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <Layout>
              <JobDetail />
            </Layout>
          }
        />
        <Route
          path="/companies"
          element={
            <Layout>
              <Companies />
            </Layout>
          }
        />
        <Route
          path="/companies/:id"
          element={
            <Layout>
              <CompanyDetail />
            </Layout>
          }
        />
        <Route
          path="/community"
          element={
            <Layout>
              <Community />
            </Layout>
          }
        />
        <Route
          path="/community/:id"
          element={
            <Layout>
              <PostDetail />
            </Layout>
          }
        />
        <Route
          path="/mentors"
          element={
            <Layout>
              <Mentors />
            </Layout>
          }
        />
        <Route
          path="/campus"
          element={
            <Layout>
              <CampusRecruitment />
            </Layout>
          }
        />
        <Route
          path="/exam-resources"
          element={
            <Layout>
              <ExamResources />
            </Layout>
          }
        />
        <Route
          path="/tools"
          element={
            <Layout>
              <Tools />
            </Layout>
          }
        />

        {/* 受保护的路由 - 需要登录 */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Layout>
                <Resume />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 页面 */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;