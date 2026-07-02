// AGV 路由

import { Router } from 'express';
import { agvs } from '../data/generators.ts';

const router = Router();

router.get('/list', (_req, res) => {
  res.json({ success: true, data: agvs });
});

router.get('/:id', (req, res) => {
  const agv = agvs.find((a) => a.id === req.params.id);
  if (!agv) {
    res.status(404).json({ success: false, error: 'AGV 不存在' });
    return;
  }
  res.json({ success: true, data: agv });
});

export default router;
