import express from 'express';
import { getAllTasks, insertTask,deleteTask } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/get-user-tasks/:userId', getAllTasks);
router.post('/insert-task', insertTask);
router.post('/delete-task/:taskId',deleteTask);

export default router;