exports.registro = (req, res) => {
// app.get('/registro', (req, res) => {
    res.render('pages/registro', { title: 'Registro' });
}

exports.login = (req, res) => {
// app.get('/login', (req, res) => {
    res.render('pages/login', { title: "Inicia Sesión" });
}

exports.ingresos = (req, res) => {
// app.get('/ingresos', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/ingresos', { title: 'Ingresos' });
    let data = req.body;
    console.log(data);
    console.log(req.session.user);
}

exports.salidas = (req, res) => {
// app.get('/salidas', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/salidas', { title: 'Salida' });
}
