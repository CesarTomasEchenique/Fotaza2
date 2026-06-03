import user  from '../models/user.js';

export const mostrarRegistro = (req,res)=>{
    res.render('registrarse');
};

export const procesarRegistro = async(req,res)=>{
    try{
        const { firstName, firstname, lastName, lastname, email, password, cumpleanos, phone } = req.body;
        
        const emailexiste = await user.findOne({where:{email}});
        if(emailexiste){
            return res.render('registrarse',{error:"el email ya esta registrado"});
        }
        
        await user.create({
            firstName: firstName || firstname, 
            lastName: lastName || lastname,   
            email: email,
            password: password,
            cumpleanos: cumpleanos || null,
            phone: (phone === "" || !phone) ? 0 : phone
        })
        res.redirect('/login');

    }
    catch (error) {
        console.error(error);
        res.status(500).send('error interno al registrar el usuario');

    }
};
