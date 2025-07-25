import { Router, ErrorRequestHandler } from 'express';
import Collection from './collection.js';

const router = Router();

router.use('/collection', Collection);

// API error handler

router.use(((err, req, res, next) => {
  let msg: string = 'Internal server error';

  if (typeof err === 'string') msg = err;

  console.log(typeof err);

  res
    .status(500)
    .json({ msg });
}) as ErrorRequestHandler);

export default router;
