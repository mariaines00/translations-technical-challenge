import { Router } from 'express';
import { submitFile } from '../controllers/submit';

const router = Router();

router.post('/', submitFile);

export default router;
