import express, { Router } from 'express';
import { mostrarLogin, procesarLogin } from '../controller/paraUser.js';

const router= express.Router();

router.get("/login",mostrarLogin);
router.post("/login",procesarLogin);
export default router;