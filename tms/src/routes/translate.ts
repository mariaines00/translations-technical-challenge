import { Router } from 'express';
import { translate } from '../controllers/translate';

const router = Router();

router.post('/', translate);

export default router;
