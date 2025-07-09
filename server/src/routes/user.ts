import express from 'express';
import { authenticate } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// 获取用户列表
router.get('/', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: '用户列表',
    data: []
  });
}));

// 获取用户详情
router.get('/:id', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: '用户详情',
    data: {}
  });
}));

export default router;