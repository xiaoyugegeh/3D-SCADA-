// 告警路由

import { Router } from 'express';
import { alarms } from '../data/generators.ts';

const router = Router();

router.get('/', (_req, res) => {
  const sorted = [...alarms].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  res.json({ success: true, data: sorted.slice(0, 50) });
});

router.post('/:id/acknowledge', (req, res) => {
  const alarm = alarms.find((a) => a.id === req.params.id);
  if (!alarm) {
    res.status(404).json({ success: false, error: '告警不存在' });
    return;
  }
  alarm.acknowledged = true;
  res.json({ success: true, data: alarm });
});

export default router;
