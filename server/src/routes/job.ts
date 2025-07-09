import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: '职位列表', data: [] });
});

export default router;