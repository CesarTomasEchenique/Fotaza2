import dotenv from 'dotenv';
dotenv.config();
import './models/user.js';
import './models/index.js';
import sequelize from './models/config.js';
import express from 'express';
import path from 'path';
import userRouter from './router/userRouter.js';

//CONSTANTES
const PORT = process.env.port;
const app = express();
const port = 3000;


//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

//MOTOR DE PLANTILLAS
app.set('views','./views');
app.set('view engine', 'pug');


//RUTAS
app.get('/login', (req,res)=>{
    res.render("iniciarSesion");
});

app.get('/perfil', (req,res)=>{
    res.render("perfil");
});
app.get('/galeria', async (req,res)=>{

    const publicaciones =
        await Publicacion.findAll();

    const publicacionesVista = [];

    for(const pub of publicaciones){

        publicacionesVista.push({

            title: pub.title,

            descripcion: pub.descripcion,

            src:
                `data:image/jpeg;base64,${
                    pub.foto.toString('base64')
                }`

        });

    }

    res.render('galeria',{

        usuario:{
            firstName:'Tomas'
        },

        publicaciones: publicacionesVista

    });

});
app.post('/publicar', async (req,res)=>{

    try{

        const base64 = req.body.imagenBase64;

        const partes = base64.split(',');

        const bufferImagen =
            Buffer.from(partes[1], 'base64');

        await Publicacion.create({

            title: req.body.titulo,

            foto: bufferImagen,

            descripcion: req.body.descripcion,

            userId: req.body.usuarioId,
            
            publicaCopyright: req.body.copyright === "true"

        });

        res.redirect('/galeria');

    }catch(error){

        console.log(error);

        res.send('Error al publicar');

    }

});

/*app.get('/galeria', async (req,res)=>{
    const publicaciones = await Publicacion.findAll();
    const arregloimagenes = [];
    for (const imagen of publicaciones){
        const imgbase64 = imagen.foto.toString('base64');
        const sufix = `data:image/${imagen.metadata}base64;`
        arrregloimagenes.push({
            name: imagen.title,
            src: sufix + imgbase64
        });
    }
    console.log("imagenes: ", arregloimagenes.length);
    res.render('galeria', {imagenes: arregloimagenes});

});

app.post('/galeria', async(req,res)=>{
    const imagenes = req.body.imgs;
    for(const img of imagenes){
        const textbase64 = img.src;

        const arreglobase64 = textbase64.split(',');
        const imagenbuffer= Buffer.from(arreglobase64[1], 'base64');
        await Publicacion.create({
            title: img.name,
            foto: imagenbuffer,
            descripcion: 'Descripción de la imagen',
            userId: 1, 
            metadata: arreglobase64[0] 
        });

    }

    res.render('galeria',{imagen: body.imgs});
});*/

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


