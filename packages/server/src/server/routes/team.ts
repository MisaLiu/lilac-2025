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
      msg: 'No such team',
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

/**
 * GET - /api/team/:id/members
 * 
 * Get all members from a team
 */
router.get(
  '/:id/members',

  param('id')
    .isNumeric()
    .toInt(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.get(data.id);

    if (!result) return res.status(404).json({
      msg: 'No such team',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON().members,
    });
  }
);

/**
 * PUT - /api/team/:id/members
 * 
 * Add a member to the team
 */
router.put(
  '/:id/members',

  param('id')
    .isNumeric()
    .toInt(),
  body('member')
    .isNumeric()
    .toInt(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.addMember(data.id, data.member);

    if (!result) return res.status(404).json({
      msg: 'No such team',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

/**
 * DELETE - /api/team/:id/members
 * 
 * Remove a member from the team
 */
router.delete(
  '/:id/members',

  param('id')
    .isNumeric()
    .toInt(),
  body('member')
    .isNumeric()
    .toInt(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.removeMember(data.id, data.member);

    if (!result) return res.status(404).json({
      msg: 'No such team',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

/**
 * DELETE - /api/team/:id
 * 
 * Delete a team
 */
router.delete(
  '/:id',

  param('id')
    .isNumeric()
    .toInt(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.remove(data.id);

    if (!result) return res.status(404).json({
      msg: 'No such team',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

export default router;
