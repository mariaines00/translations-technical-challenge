import { Router } from 'express';
import { submitFile } from '../controllers/submit';

const router = Router();

//@Body validator would be nice
router.post('/', submitFile);

export default router;
