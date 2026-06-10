import user  from '../models/user.js';

export const mostrarRegistro = (req,res)=>{
    res.render('registrarse');
};

export const procesarRegistro = async(req,res)=>{
   const { firstName, lastName, email, password, cumpleanos, phone } = req.body;
    const name = firstName.trim();
    const lastname = lastName.trim();
    const emaillimpio = email.trim();
    const passwordlimpio= password.trim();
    const cumpleanoslimpio = cumpleanos.trim();
    const phonelimpio = phone.trim();
    if (!name || !lastname || !emaillimpio || !passwordlimpio || !cumpleanoslimpio || !phonelimpio) {
        return res.render('registrarse', { error: "Todos los campos son obligatorios" });
    }
    try {
        const user = await User.create({
            firstName: name,
            lastName: lastname,
            email: emaillimpio,
            password: passwordlimpio,
            cumpleanos: cumpleanoslimpio,
            phone: phonelimpio
        });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.redirect('/registrarse');
        return;
    }
};
