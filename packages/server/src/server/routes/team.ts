import { Router } from 'express';
import { param, body, matchedData } from 'express-validator';
import * as Controllers from '../controllers/team.js';
import { checkValidation } from '../utils/validation.js';

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

/**
 * GET - /api/team/:id
 * 
 * Get team detail
 */
router.get(
  '/:id',

  param('id')
    .isNumeric()
    .toInt(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.get(data.id);

    if (!result) return res.status(404).json({
      msg: 'No such collection',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

/**
 * PUT - /api/team
 * 
 * Create a team
 */
router.put(
  '/',
  
  body('members')
    .isArray()
    .toArray()
    .custom((e: string[]) => e.length === 2)
    .custom((e: string[]) => (
      e.length === e.filter(e => !isNaN(parseInt(e))).length
    )),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const members = (data.members as Array<number | string>).map((e) => parseInt(`${e}`));
    const result = await Controllers.add(members as [ number, number ]);

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

export default router;
