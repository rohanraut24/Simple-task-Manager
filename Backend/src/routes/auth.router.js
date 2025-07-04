import express from 'express'
import { signup ,login} from '../controllers/auth.controller.js';
const router =express.Router();

router.post("/signup",signup); // this is router for signup 
router.post("/login",login);

export default router;