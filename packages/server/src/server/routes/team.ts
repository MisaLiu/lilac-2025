import { Router } from 'express';
import * as Controllers from '../controllers/team.js';

const router = Router();

/**
 * GET - /api/team/all
 * 
 * Get all teams
 */
router.get(
  '/all',
  async (_req, res) => {
    const teams = await Controllers.getAll();

    res.json({
      msg: 'ok',
      data: teams,
    });
  }
);

export default router;
