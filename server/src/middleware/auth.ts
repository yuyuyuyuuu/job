import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  userId: string;
  email: string;
  userType: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '访问被拒绝，请提供有效的token'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Token无效'
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: '用户未认证'
      });
    }

    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: '没有权限访问此资源'
      });
    }

    next();
  };
};

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const user = await User.findById(decoded.userId);
      
      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // 可选认证失败不影响流程
    next();
  }
};

export const requireVerification = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: '用户未认证'
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: '请先验证邮箱'
    });
  }

  next();
};

export const requireProfessionalVerification = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: '用户未认证'
    });
  }

  if (req.user.userType !== 'professional') {
    return res.status(403).json({
      success: false,
      message: '仅限认证从业者访问'
    });
  }

  if (!req.user.professionalInfo?.isVerified) {
    return res.status(403).json({
      success: false,
      message: '请先完成从业者认证'
    });
  }

  next();
};

export const requireMembership = (membershipType: 'premium' | 'vip') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: '用户未认证'
      });
    }

    const userMembership = req.user.membership.type;
    const membershipLevels = ['free', 'premium', 'vip'];
    const requiredLevel = membershipLevels.indexOf(membershipType);
    const userLevel = membershipLevels.indexOf(userMembership);

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: `需要${membershipType}会员权限`
      });
    }

    // 检查会员是否过期
    if (req.user.membership.expiresAt && req.user.membership.expiresAt < new Date()) {
      return res.status(403).json({
        success: false,
        message: '会员已过期，请续费'
      });
    }

    next();
  };
};

export default {
  authenticate,
  authorize,
  optionalAuth,
  requireVerification,
  requireProfessionalVerification,
  requireMembership
};