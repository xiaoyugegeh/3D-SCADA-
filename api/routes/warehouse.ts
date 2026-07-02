// 仓库概览路由

import { Router } from 'express';
import { getOverview } from '../data/generators.ts';

const router = Router();

router.get('/overview', (_req, res) => {
  res.json({ success: true, data: getOverview() });
});

export default router;
