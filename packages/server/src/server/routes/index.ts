import { Router } from 'express';
import Collection from './collection.js';

const router = Router();

router.use('/collection', Collection);

export default router;
