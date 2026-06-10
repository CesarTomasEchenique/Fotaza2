import express, { Router } from 'express';
import path from 'path';
import { mostrarLogin, procesarLogin } from '../controller/paraUser.js';
import { mostrarRegistro,procesarRegistro } from '../controller/paraRegistro.js';
import user from '../models/user.js';



const router= express.Router();

router.get("/login",mostrarLogin);
router.post("/login",procesarLogin);


router.get("/registro",mostrarRegistro);
router.post("/registro",procesarRegistro);





export default router;