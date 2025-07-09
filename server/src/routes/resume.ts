import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: '简历列表', data: [] });
});

export default router;