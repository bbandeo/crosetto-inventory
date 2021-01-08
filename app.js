const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.locals.baseUrl = "http://localhost:3000";
app.use(session({ secret: 'very secret' }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text({ type: "text/plain" })); // use this instead

let pwHash = (pwd) => {
    return bcrypt.hashSync(pwd, 10);
}

let pwVerify = (pwd, hash) => {
    if (bcrypt.compareSync(pwd, hash)) {
        return true;
    } else {
        return false;
    }
}

// STATIC

app.use(express.static('public'));

// MySQL
let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});

connection.connect((err) => {
    if (err) {
        console.log("No se puede conectar a base de datos MySQL");
        throw err
    }
    console.log("Conectado a base de datos");
});

// APP
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// // HOME.
app.get('/', (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/login');
    } else {

        res.locals.user = req.session.user;
        connection.query('SELECT * from info_articulo', function (error, results, fields) {
            console.log(results)
            if (error) throw error;
            res.render('pages/index', {
                title: "INDEX",
                articulo: results
            });
        });
    }
});

app.get('/about', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/about', { title: 'About' });
});

app.get('/ingresos', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/ingresos', { title: 'Ingresos' });

    let data = req.body;
    console.log(data);
    console.log(req.session.user);
});
app.post('/ingresos', (req, res) => {
    let data = req.body;
    let user = req.session.user
    console.log(data);
    console.log(req.session.user);
    if (user != undefined) {
        connection.query(`INSERT into articulo(codbar,descripcion,nombre,operario_ingreso) values('${data.codbar}','${data.articulo_name}','${data.descripcion}','${user.id}')`, function (error, results, fields) {
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
});
app.get('/ingresos/codbar', (req, res) => {
    console.log("LLAMA QUE LLAMA")
    // let data = req;
    let codbar = req.body;
    // console.log(data);
    console.log({ codbar });
});

app.get('/salidas', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/salidas', { title: 'Salida' });
});

// LOGIN
app.get('/login', (req, res) => {
    res.render('pages/login', { title: "Inicia Sesión" });
});
app.post('/login', (req, res) => {
    console.log(req.body);
    let usr = req.body;
    usr.uname = usr.uname.toUpperCase();
    console.log(usr.uname);
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
});


// REGISTRO
app.get('/registro', (req, res) => {
    res.render('pages/registro', { title: 'Registro' });
});
// app.post('/registro', (req, res) => {
//     console.log(req.body);
// })
app.post('/registro', function (req, res) {
    console.log(req.body)
    let usr = req.body
    usr.uname = usr.uname.toUpperCase();
    let pwwd = pwHash(usr.pwd)
    if (usr.token == process.env.TOKEN) {
        connection.query(`SELECT * from operario where username="${usr.uname}"`, function (err, rows, fields) {
            if (rows.length <= 0) {
                //no user with specified username
                connection.query(`INSERT into operario(username, password) values("${usr.uname}","${pwwd}")`, function (err, rows, fields) {
                    if (!err) {
                        res.render('pages/login', { title: "Registro exitoso!" });
                    } else {
                        console.log(err)
                        res.render('pages/registro', { title: "Ocurrió un error", failed: true })
                    }
                })
            } else {
                res.render('pages/registro', { title: "Nombre de usuario ya se encuentra en uso", failed: true })
            }
        });
    }
    else {
        res.render('pages/registro', { title: "Token inválido", failed: true })
    }
})

//log out
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.status(404).render('pages/404', { title: "ERROR 404" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started at port " + port)
    console.log(`http://${process.env.HOST}:${port}`)
});