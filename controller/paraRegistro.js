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
        res.status(500).render('registrarse', {
            alert: {
                status: "error",
                text: "complete todos los campos"
            },
            formValues: {
                firstName: name,
                lastName: lastname,
                email: emaillimpio,
                password: passwordlimpio,
                cumpleanos: cumpleanoslimpio,
                phone: phonelimpio
            }
        });
        return;
    }
    try {
        const usuarioExistente = await User.findOne({
        where: { email: emaillimpio }
    });
    if (usuarioExistente) {
        return res.status(500).render('registrarse', {
            alert: {
                status: "error",
                text: "el email ya esta registrado"
            },
            formValues: {
                firstName: name,
                lastName: lastname,
                email: emaillimpio,
                password: passwordlimpio,
                cumpleanos: cumpleanoslimpio,
                phone: phonelimpio
            }
        });
    }
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
        res.status(500).render('registrarse',{
            alert: {
                status: "error",
                text: "hubo un error al registrarse"
            },
            formValues: {
                firstName: name,
                lastName: lastname,
                email: emaillimpio,
                password: passwordlimpio,
                cumpleanos: cumpleanoslimpio,
                phone: phonelimpio
            }
        });
        return;
    }
};
