require('dotenv').config();
const connection = require('../configs/db');


exports.ingresos = (req, res) => {
    // app.post('/ingresos', (req, res) => {
    let data = req.body;
    let user = req.session.user
    let query = `INSERT into articulo(codbar,descripcion,nombre,operario_ingreso) values('${data.codbar}','${data.marca}','${data.descripcion}','${user.id}')`;
    // console.log(data);
    // console.log(req.session.user);
    if (user != undefined) {
        connection.query(query, function (error, results, fields) {
            if (!error) {
                console.log("Agregado exitosamente!");
                res.redirect('pages/ingresos');
            } else {
                console.log(error);
                res.render('pages/ingresos', { title: 'Falló' });
            }
        });
    } else {
        res.redirect('/login');
    }
}

exports.codbar = (req, res) => {
    // app.post('/ingresos/codbar', (req, res) => {
    let data = req.body;
    connection.query(`SELECT * FROM info_articulo WHERE codbar="${data}"`, (err, rows, fields) => {
        if (!err) {
            if (rows.length == 0) {
                res.status(404).send("404");
            } else {
                const result = rows[0];
                const ans = `${result['marca']}-${result['modelo']}-${result['tamano']}`
                console.log("🍕");
                console.log(ans);
                res.status(200).send(ans);
            }
        }
        res.status(404);
    });
}

exports.insert = (req, res) => {
    // app.post('/insert', (req, res) => {
    let data = req.body;
    let user = req.session.user
    console.log(data);

    if (user != undefined) {
        let inserts = [];
        for (i = 0; i < data.cantidad; i++) {
            inserts.push([data.codbar, data.marca, data.descripcion, user.id]);
        }
        // connection.query(`SELECT EXISTS(SELECT * FROM info_articulo WHERE codbar=${data.codbar})`, (error, results, fields) => {
        connection.query(`SELECT * FROM info_articulo WHERE codbar=${data.codbar}`, (error, results, fields) => {
            if (results.length == 0) {
                connection.query({ sql: `INSERT INTO info_articulo(codbar,marca,modelo,observaciones) VALUES ('${data.codbar}','${data.marca}','${data.modelo}','${data.descripcion}')`, values: [inserts] }, (error, results, fields) => {
                    if (!error) {
                        console.log("Artículo agregado exitosamente!");
                    } else {
                        console.log(error);
                    }
                });
            }
            connection.query({ sql: `INSERT INTO articulo(codbar,descripcion,nombre,operario_ingreso) VALUES ?`, values: [inserts] }, (error, results, fields) => {
                if (!error) {
                    console.log("Agregado exitosamente!");
                    res.render('pages/index', { title: 'Agregado exitosamente!' });
                } else {
                    console.log(error);
                    res.render('pages/ingresos', { title: 'Falló' });
                }
            });
        });
    } // IF !USER
}
