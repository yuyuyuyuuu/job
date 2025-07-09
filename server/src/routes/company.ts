import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: '公司列表', data: [] });
});

export default router;