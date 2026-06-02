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


