import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: '聊天记录', data: [] });
});

export default router;