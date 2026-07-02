// 任务路由

import { Router } from 'express';
import { tasks } from '../data/generators.ts';

const router = Router();

router.get('/list', (_req, res) => {
  res.json({ success: true, data: tasks });
});

export default router;
