import express from 'express';
import { getAllTasks, insertTask, deleteTask,updateTask } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/get-user-tasks', getAllTasks);
router.post('/insert-task', insertTask);
router.delete('/delete-task', deleteTask); 
router.patch('/update-task',updateTask);

export default router;