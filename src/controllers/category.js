const connection = require('../configs/db');

function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}


exports.registro = (req, res) => {
    res.render('pages/registro', { title: 'Registro' });
}

exports.login = (req, res) => {
    res.render('pages/login', { title: "Inicia Sesión" });
}

exports.ingresos = (req, res) => {
    let ubicacion = [];

    connection.query('SELECT * FROM ubicacion', (error, results, fields) => {
        if (error) throw error;

        results.forEach((i) => {
            let descrip = lowerCaseAllWordsExceptFirstLetters(i.descripcion)
            ubicacion.push({
                id: i.id,
                descripcion: descrip
            });
        });
        console.log("ubicacion")
        console.log(ubicacion)

        res.render('pages/ingresos', {
            title: 'Ingresos',
            ubicaciones: ubicacion
        });
    });
    // console.log(ubicaciones)


}

exports.salidas = (req, res) => {
    res.render('pages/salidas', { title: 'Salida' });
}

exports.about = (req, res) => {
    res.render('pages/about', { title: 'About' });
};