import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// 注册
router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, username, userType, studentInfo, professionalInfo, hrInfo } = req.body;

  // 检查用户是否已存在
  const existingUser = await User.findOne({ 
    $or: [{ email }, { username }] 
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: '用户已存在'
    });
  }

  // 创建用户
  const userData: any = {
    email,
    password,
    username,
    userType,
    profile: {},
    membership: {
      type: 'free',
      features: []
    },
    settings: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      privacy: 'public'
    },
    stats: {
      loginCount: 0,
      postsCount: 0,
      connectionsCount: 0,
      viewsCount: 0
    }
  };

  // 根据用户类型添加相应信息
  if (userType === 'student' && studentInfo) {
    userData.studentInfo = studentInfo;
  } else if (userType === 'professional' && professionalInfo) {
    userData.professionalInfo = professionalInfo;
  } else if (userType === 'hr' && hrInfo) {
    userData.hrInfo = hrInfo;
  }

  const user = new User(userData);
  await user.save();

  // 生成JWT token
  const token = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      userType: user.userType
    },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(201).json({
    success: true,
    message: '注册成功',
    data: {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified
      },
      token
    }
  });
}));

// 登录
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 查找用户（包含密码字段）
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: '邮箱或密码错误'
    });
  }

  // 验证密码
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: '邮箱或密码错误'
    });
  }

  // 更新登录统计
  user.stats.loginCount += 1;
  user.stats.lastLoginAt = new Date();
  await user.save();

  // 生成JWT token
  const token = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      userType: user.userType
    },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.json({
    success: true,
    message: '登录成功',
    data: {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        membership: user.membership
      },
      token
    }
  });
}));

// 获取当前用户信息
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const user = req.user;

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        profile: user.profile,
        membership: user.membership,
        settings: user.settings,
        stats: user.stats,
        studentInfo: user.studentInfo,
        professionalInfo: user.professionalInfo,
        hrInfo: user.hrInfo
      }
    }
  });
}));

// 更新用户资料
router.put('/profile', authenticate, asyncHandler(async (req, res) => {
  const user = req.user;
  const updates = req.body;

  // 允许更新的字段
  const allowedUpdates = ['username', 'avatar', 'profile', 'settings'];
  const actualUpdates: any = {};

  Object.keys(updates).forEach(key => {
    if (allowedUpdates.includes(key)) {
      actualUpdates[key] = updates[key];
    }
  });

  Object.keys(actualUpdates).forEach(key => {
    if (key === 'profile' || key === 'settings') {
      user[key] = { ...user[key], ...actualUpdates[key] };
    } else {
      user[key] = actualUpdates[key];
    }
  });

  await user.save();

  res.json({
    success: true,
    message: '资料更新成功',
    data: {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        userType: user.userType,
        avatar: user.avatar,
        profile: user.profile,
        settings: user.settings
      }
    }
  });
}));

// 修改密码
router.put('/password', authenticate, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '用户不存在'
    });
  }

  // 验证当前密码
  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: '当前密码错误'
    });
  }

  // 更新密码
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: '密码修改成功'
  });
}));

// 退出登录
router.post('/logout', authenticate, asyncHandler(async (req, res) => {
  // 在实际应用中，这里可以将token加入黑名单
  // 或者使用Redis存储token的状态
  
  res.json({
    success: true,
    message: '退出登录成功'
  });
}));

export default router;