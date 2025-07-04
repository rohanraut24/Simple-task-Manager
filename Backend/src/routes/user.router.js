import express from 'express';
import { getAllTasks, insertTask } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/get-user-tasks/:userId', getAllTasks);

router.post('/insert-task', insertTask);

export default router;