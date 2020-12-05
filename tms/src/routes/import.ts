import { Router } from 'express';
import { importData } from '../controllers/import';

const router = Router();

router.post('/', importData);

export default router;
