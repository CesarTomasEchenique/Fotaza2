import user from "../models/user.js";
import { User, Publicacion } from '../models/index.js';

export const mostrarLogin = (req,res)=>{
    res.render('iniciarSesion');
};

export const procesarLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Buscamos al usuario por su email
        const usuarioEncontrado = await User.findOne({ where: { email } });

        if (!usuarioEncontrado) {
            return res.render('iniciarSesion', { error: "El email no se encontró" });
        }

        // 2. Validamos la contraseña de forma simple
        if (usuarioEncontrado.password === password) {
            // Mandamos solo el objeto del usuario a la vista perfil.pug
            return res.render('perfil', { usuario: usuarioEncontrado });
        } else {
            return res.render('iniciarSesion', { error: "La contraseña es incorrecta" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno en el servidor');
    }
};

export const guardarPublicacion = async (req, res) => {
    try {
        // 1. Esto lo pusiste excelente en tu captura
        const { usuarioId, titulo, descripcion, copyright } = req.body;

        if (!req.file) {
            return res.status(400).send('No se subió ninguna imagen.');
        }

        const esCopyright = copyright === 'on' ? true : false;

        // 2. CORREGIDO: Mapeamos los campos exactos hacia tu modelo
        await Publicacion.create({
            titulo: titulo,
            descripcion: descripcion || null,
            contenido: req.file.filename, // Multer guarda el nombre del archivo acá
            copyright: esCopyright,
            userId: usuarioId // 👈 Cambiado 'user' por 'usuarioId'
        });

        // 3. CORREGIDO: Buscamos al usuario usando su ID numérico real
        const usuarioActualizado = await User.findByPk(usuarioId); // 👈 Cambiado 'user' por 'usuarioId'
        
        const todasSusPublicaciones = await Publicacion.findAll({
            where: { userId: usuarioId }, // 👈 Cambiado 'user' por 'usuarioId'
            order: [['createdAt', 'DESC']]
        });

        // 4. Renderizamos devolviendo los datos limpios a tu vista perfil.pug
        return res.render('perfil', {
            usuario: usuarioActualizado,
            publicaciones: todasSusPublicaciones
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la publicación');
    }
};

