import dotenv from 'dotenv';
dotenv.config();
import './models/user.js';
import './models/index.js';
import sequelize from './models/config.js';
import express from 'express';
import path from 'path';
import userRouter from './router/userRouter.js';
import Publicacion from './models/Publicacion.js';

//CONSTANTES
const PORT = process.env.port;
const app = express();
const port = 3000;


//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(userRouter);

//MOTOR DE PLANTILLAS
app.set('views','./views');
app.set('view engine', 'pug');

//lets
let imagenSubida =null;
//RUTAS
app.get('/login', (req,res)=>{
    res.render("iniciarSesion");
});

app.get('/perfil', (req,res)=>{
    res.render('perfil', {
    usuario: user
});
});


app.get("/galeria", async (req,res)=>{
    const publicaciones =
        await Publicacion.findAll();
    const arregloImagenes = [];
    for(const imagen of publicaciones){
        const imagen64 =
            imagen.foto.toString("base64");
        const src =
            `${imagen.metadata},${imagen64}`;
        arregloImagenes.push({
            title: imagen.title,
            description: imagen.description,
            src
        });

    }
    console.log(req.body);
    res.render("galeria",{
        imagenes: arregloImagenes
    });
});



app.post("/perfil", async (req,res)=>{
    try{
        const base64 = req.body.imagenBase64;
        const partes = base64.split(",");
        const bufferImagen =
            Buffer.from(partes[1],"base64");
        console.log(req.body);    
        await Publicacion.create({
            title: req.body.titulo,
            foto: bufferImagen,
            descripcion: req.body.descripcion,
            publicaCopyright: req.body.copyright === 'true',
            metadata: partes[0],
            userId: req.body.usuarioId
        });
        
        res.redirect('/galeria');
    }catch(error){
        console.log(error);
        res.status(500).json({ok:false});
    }
});





app.get('/registro',(req,res)=>{
    res.render("registrarse");
});

app.get('/usuarios', async (req, res) => {

    try {
        const resultado = await base.query('SELECT NOW()');
        res.json(resultado.rows);

    } catch (error) {

        console.log(error);
        res.status(500).send('Error BD');
    }
});



app.get("/", (req, res) => {
    res.status(200).send("Bienvenido al servidor 3000")
})

app.get("/fotazahome", (req, res) => {
    res.render("index");
   
  
})

//CONEXION A BD
sequelize.sync({ alter: true })
    .then(() => {
        //SERVIDOR

        app.listen(port, (err) => {
            if (err) {
                console.error('error al iniciar el servidor: ', err);
                return;
            }
            console.log(`servidor corriendo en : http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.error('error al sincronizar base de datos: ', err)
    });


