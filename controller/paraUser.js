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
        return res.render('iniciarSesion', { error: "Todos los campos son obligatorios" });
    }
    try {
        const usuarioEncontrado = await user.findOne({ where: { email: emaillimpio } });
        if (!usuarioEncontrado) {
            return res.render('iniciarSesion', { error: "El email no se encontró" });
        }
        
        const validate = await usuarioEncontrado.validarContraseña(passwordlimpio);
        if (!validate) {
            return res.render('iniciarSesion', { error: "La contraseña es incorrecta" });
        }
        
        res.render('perfil', { usuario: usuarioEncontrado });
    }    
    catch (error) {
        console.error(error);
        res.redirect('/login');
        return;
    }
};





export const guardarPublicacion = async (req, res) => {
    try {
        const { usuarioId, titulo, descripcion, copyright } = req.body;

        // 1. CORREGIDO: Validamos usando req.files (plural)
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No se seleccionó ninguna imagen.');
        }

        const esCopyright = copyright === 'on' ? true : false;

        // 2. CORREGIDO: Recorremos las fotos con un bucle para guardar cada una
        for (const file of req.files) {
            await Publicacion.create({
                titulo: titulo,
                descripcion: descripcion || null,
                contenido: file.filename, // 👈 file tiene el filename de cada foto del array
                copyright: esCopyright,
                userId: usuarioId
            });
        }

        // 3. Buscamos los datos actualizados para volver a mostrar el perfil
        const usuarioActualizado = await User.findByPk(usuarioId);
        const todasSusPublicaciones = await Publicacion.findAll({
            where: { userId: usuarioId },
            order: [['createdAt', 'DESC']]
        });

        return res.render('perfil', {
            usuario: usuarioActualizado,
            publicaciones: todasSusPublicaciones
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear las publicaciones');
    }
};

