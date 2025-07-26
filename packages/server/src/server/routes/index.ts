import { Router, ErrorRequestHandler } from 'express';
import Collection from './collection.js';
import Member from './member.js';
import Team from './team.js';

const router = Router();

router.use('/collection', Collection);
router.use('/member', Member);
router.use('/team', Team);

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
