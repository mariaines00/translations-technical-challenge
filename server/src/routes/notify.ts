import { Router } from 'express';
import { notifyUser } from '../controllers/notify';

const router = Router();

router.post('/', notifyUser);

export default router;
