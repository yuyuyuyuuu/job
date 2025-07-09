import axios from 'axios';

const API_URL = '/api/auth';

// 创建axios实例
const authApiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器，自动添加token
authApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器，处理错误
authApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  // 用户注册
  register: async (userData: {
    email: string;
    password: string;
    username: string;
    userType: string;
    studentInfo?: any;
    professionalInfo?: any;
    hrInfo?: any;
  }) => {
    const response = await authApiInstance.post('/register', userData);
    return response.data;
  },

  // 用户登录
  login: async (credentials: { email: string; password: string }) => {
    const response = await authApiInstance.post('/login', credentials);
    return response.data;
  },

  // 获取当前用户信息
  getCurrentUser: async () => {
    const response = await authApiInstance.get('/me');
    return response.data;
  },

  // 更新用户资料
  updateProfile: async (profileData: any) => {
    const response = await authApiInstance.put('/profile', profileData);
    return response.data;
  },

  // 修改密码
  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await authApiInstance.put('/password', passwordData);
    return response.data;
  },

  // 退出登录
  logout: async () => {
    const response = await authApiInstance.post('/logout');
    return response.data;
  },

  // 发送验证邮件
  sendVerificationEmail: async () => {
    const response = await authApiInstance.post('/send-verification');
    return response.data;
  },

  // 验证邮箱
  verifyEmail: async (token: string) => {
    const response = await authApiInstance.post('/verify-email', { token });
    return response.data;
  },

  // 忘记密码
  forgotPassword: async (email: string) => {
    const response = await authApiInstance.post('/forgot-password', { email });
    return response.data;
  },

  // 重置密码
  resetPassword: async (token: string, password: string) => {
    const response = await authApiInstance.post('/reset-password', { token, password });
    return response.data;
  },
};

export default authApi;