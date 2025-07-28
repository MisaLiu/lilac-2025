import { Router } from 'express';
import { param, body, matchedData, check } from 'express-validator';
import * as Controllers from '../controllers/member.js';
import { checkValidation } from '../utils/validation.js';

const router = Router();

/**
 * GET - /api/member/all
 * 
 * Get all members
 */
router.get(
  '/all',
  async (_req, res) => {
    const result = await Controllers.getAll();

    res.json({
      msg: 'ok',
      data: result,
    });
  }
);

/**
 * GET - /api/member/:qq
 * 
 * Get a member info
 */
router.get(
  '/:qq',

  param('qq')
    .custom(e => !isNaN(parseInt(e)))
    .custom(e => e > 10000 && e < 9999999999),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.get(data.qq);

    if (!result) return res.status(404).json({
      msg: 'No such member',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

/**
 * PUT - /api/member/:qq
 * 
 * Add a member
 */
router.put(
  '/:qq',

  param('qq')
    .custom(e => !isNaN(parseInt(e)))
    .custom(e => e > 10000 && e < 9999999999),
  body('name')
    .isString()
    .trim()
    .notEmpty(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.add(data.qq, data.name);

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

/**
 * POST - /api/member/:qq
 * 
 * Edit member info
 */
router.post(
  '/:qq',

  param('qq')
    .custom(e => !isNaN(parseInt(e)))
    .custom(e => e > 10000 && e < 9999999999),
  body('name')
    .isString()
    .trim()
    .notEmpty(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.edit(data.qq, { name: data.name });

    if (!result) return res.status(404).json({
      msg: 'No such member',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

/**
 * DELETE - /api/member/:qq
 * 
 * Delete a member
 */
router.delete(
  '/:qq',

  param('qq')
    .custom(e => !isNaN(parseInt(e)))
    .custom(e => e > 10000 && e < 9999999999),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.remove(data.qq);

    if (!result) return res.status(404).json({
      msg: 'No such member',
    });

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

export default router;
