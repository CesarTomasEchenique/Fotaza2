const express= require ("express");
const base = require ("./database");

const app= express();
const port =3000;
const path = require("path");

app.get('/usuarios', async (req, res) => {

    try {

        const resultado = await base.query('SELECT NOW()');

        res.json(resultado.rows);

    } catch(error) {

        console.log(error);

        res.status(500).send('Error BD');
    }
});

app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.status(200).send("Bienvenido al servidor 3000")
})

app.get("/fotazahome", (req,res)=>{
    res.sendFile(path.join(__dirname,"public", "FotazaIndex.html"));
})


app.listen(port,()=>{
    console.log(`servidor corriendo en : http://localhost:${port}`);
})