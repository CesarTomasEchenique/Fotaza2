import user from "../models/user.js";
 
export const mostrarLogin = (req,res)=>{
    res.render('iniciarSesion');
};

export const procesarLogin = async(req,res)=>{
    try{
        const {email,password}= req.body;
        const usuarioEncontrado = await user.findOne({where :{email}});
        if(!usuarioEncontrado){
            return res.render('iniciarSesion',{error:"el emeil no se encontro"});
        }
        if(usuarioEncontrado.password === password){
            return res.render('perfil',{nombre: usuarioEncontrado.firtsName});
        }else{
            return res.render('iniciarSesion',{error:"la contraseña es incorrecta"});
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).send('error interno en el servidor');

    }
};
