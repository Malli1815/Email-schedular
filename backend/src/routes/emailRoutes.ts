import express from 'express';
import { getEmails, scheduleEmail, getStats, deleteEmail, sendNow } from '../controllers/emailController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getEmails);
router.post('/schedule', authenticateToken, scheduleEmail);
router.get('/stats', authenticateToken, getStats);
router.delete('/:id', authenticateToken, deleteEmail);
router.post('/:id/send', authenticateToken, sendNow);

export default router;
