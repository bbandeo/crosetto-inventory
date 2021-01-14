require('dotenv').config();
const connection = require('../configs/db');
const bcrypt = require('bcryptjs');

const pwHash = (pwd) => {
    return bcrypt.hashSync(pwd, 10);
}
const pwVerify = (pwd, hash) => {
    if (bcrypt.compareSync(pwd, hash)) {
        return true;
    } else {
        return false;
    }
}


exports.home = (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/login');
    } else {

        let comments = [
            {author: "Adam", content: "I personally have never encountered a different opinion"},
            {author: "Ryan", content: "But what about Ligers? Are they good pets?"},
            {author: "Nick", content: "This woman is a genius!"}
        ];

        let user = res.locals.user
        connection.query('SELECT * from info_articulo', (error, results, fields) => {
            if (error) throw error;
            res.render('pages/index', {
                title: `BIENVENIDO ${user.username}`,
                articulo: results,
                comments: comments
            });
        });
    }
}

exports.login = (req, res) => {
    // app.post('/login', (req, res) => {
    let usr = req.body;
    usr.uname = usr.uname.toUpperCase();
    connection.query(`SELECT * from operario where username="${usr.uname}"`, (err, rows, fields) => {
        if (!err) {
            console.log('The solution is: ', rows[0]);
            if (typeof rows[0] != 'undefined' && pwVerify(usr.pwd, rows[0].password)) {
                console.log("Login exitoso");
                req.session.user = {
                    id: rows[0].id,
                    username: rows[0].username.toUpperCase(),
                };
                res.redirect('/');
            } else {
                res.render('pages/login', { title: "Login falló. Intenta nuevamente", failed: true });
            }
        }
        else throw err;
    });
}

exports.register = (req, res) => {
    // app.post('/registro', (req, res) => {
    let data = req.body
    data.uname = data.uname.toUpperCase();
    let query = `SELECT * from operario where username="${data.uname}"`;
    if (data.token == process.env.TOKEN) {
        connection.query(query, (err, rows, fields) => {
            if (rows.length > 0) {
                res.render('pages/registro',
                    {
                        title: "Nombre de usuario ya se encuentra en uso",
                        failed: true
                    });
            } else {
                connection.query(`INSERT into operario(username, password) values("${data.uname}","${pwHash(data.pwd)}")`, (err, rows, fields) => {
                    if (!err) {
                        res.render('pages/login',
                            {
                                title: "Registro exitoso!"
                            });
                    } else {
                        console.log(err)
                        res.render('pages/registro',
                            {
                                title: "Ocurrió un error",
                                failed: true
                            });
                    }
                });
            }
        });
    }
    else {
        res.render('pages/registro',
            {
                title: "Token inválido",
                failed: true
            });
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.notFound = (req, res) => {
    res.status(404).render('pages/404', { title: "ERROR 404" });
}