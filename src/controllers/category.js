exports.registro = (req, res) => {
    res.render('pages/registro', { title: 'Registro' });
}

exports.login = (req, res) => {
    res.render('pages/login', { title: "Inicia Sesión" });
}

exports.ingresos = (req, res) => {
    res.render('pages/ingresos', { title: 'Ingresos' });
    let data = req.body;
    console.log(data);
    console.log(req.session.user);
}

exports.salidas = (req, res) => {
    res.render('pages/salidas', { title: 'Salida' });
}

exports.about = (req, res) => {
    res.render('pages/about', { title: 'About' });
};