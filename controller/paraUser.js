import user from "../models/user.js";
import { User, Publicacion } from '../models/index.js';
import bcrypt from 'bcrypt';


export const mostrarLogin = (req,res)=>{
    res.render('iniciarSesion');
};

export const procesarLogin = async (req, res) => {
     const { email, password } = req.body;
    const emaillimpio = email.trim();
    const passwordlimpio = password.trim();

    if (!emaillimpio || !passwordlimpio) {
        res.status(400).render('iniciarSesion', {
            alert: {
                status: "error",
                text: "complete todos los campos"
            },
            formValues: {
                email: emaillimpio,
                password: passwordlimpio
            }
        });
        return;
    }
    try {
        const usuarioEncontrado = await user.findOne({
             where: { email: emaillimpio } });
        if (!usuarioEncontrado) {
            res.status(400).render('iniciarSesion', {
            alert: {
                status: "error",
                text: "hubo un error al iniciar sesion"
            },
            formValues: {
                email: emaillimpio,
                password: passwordlimpio
            }
        });
        return;
        }
        
        const validate = await usuarioEncontrado.validarContrasena(passwordlimpio);
        if (!validate) {
            res.status(400).render('iniciarSesion', {
            alert: {
                status: "error",
                text: ".hubo un error al iniciar sesion"
            },
            formValues: {
                email: emaillimpio,
                password: passwordlimpio
            }
        });
        return;
        }
        
        res.render('perfil', { usuario: usuarioEncontrado });
    }    
    catch (error) {
        console.error(error);
        res.status(400).render('iniciarSesion',{
            alert: {
                status: "error",
                text: "hubo un error al iniciar sesion"
            },
            formValues: {
                email: emaillimpio,
                password: passwordlimpio
            }
        });
        return;
    }
};






