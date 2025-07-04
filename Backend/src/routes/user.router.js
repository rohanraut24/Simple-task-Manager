
import express from 'express';
// import { Task } from './models/task.model.js';
import {getAllTasks,insertTask} from './controller/user.controller.js'
const router =express.Router();

router.get('/get-user-tasks/:userId',getAllTasks);

router.post('/insert-task',insertTask);

export default router;