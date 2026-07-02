// 料箱路由

import { Router } from 'express';
import { boxes } from '../data/generators.ts';

const router = Router();

router.get('/list', (_req, res) => {
  res.json({ success: true, data: boxes.slice(0, 50) });
});

router.get('/:containerCode', (req, res) => {
  const box = boxes.find((b) => b.containerCode === req.params.containerCode);
  if (!box) {
    res.status(404).json({ success: false, error: '料箱不存在' });
    return;
  }
  res.json({ success: true, data: box });
});

export default router;
