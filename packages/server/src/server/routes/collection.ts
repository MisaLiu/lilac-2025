import { Router } from 'express';
import { param, body, matchedData } from 'express-validator';
import * as Controllers from '../controllers/collection.js';
import { checkValidation } from '../utils/validation.js';

const router = Router();

/**
 * GET - /api/collection/all
 * 
 * Get all collections
 */
router.get('/all', async (req, res) => {
  const collections = await Controllers.getAll();

  res.json({
    collections,
  });
});

/**
 * GET - /api/collection/:name
 * 
 * Get a detail of a collection
 */
router.get(
  '/:name',

  param('name')
    .isString()
    .trim()
    .notEmpty(),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.get(data.name);

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
 * PUT - /api/collection/:name
 * 
 * Create a collection
 */
router.put(
  '/:name',

  param('name')
    .isString()
    .trim()
    .notEmpty(),
  body('description')
    .isString()
    .trim()
    .notEmpty(),
  body('type')
    .optional()
    .isString()
    .trim()
    .default('neutral')
    .toLowerCase()
    .isIn([ 'positive', 'negative', 'neutral' ]),
  checkValidation,

  async (req, res) => {
    const data = matchedData(req);
    const result = await Controllers.add(data.name, data.description, data.type);

    res.json({
      msg: 'ok',
      data: result.toJSON(),
    });
  }
);

export default router;
