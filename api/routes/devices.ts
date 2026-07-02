// 设备路由

import { Router } from 'express';
import { devices } from '../data/generators.ts';

const router = Router();

router.get('/list', (_req, res) => {
  res.json({ success: true, data: devices });
});

router.get('/:id', (req, res) => {
  const device = devices.find((d) => d.id === req.params.id);
  if (!device) {
    res.status(404).json({ success: false, error: '设备不存在' });
    return;
  }
  res.json({ success: true, data: device });
});

export default router;
