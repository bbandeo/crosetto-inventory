const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const app = express();

app.locals.baseUrl = "http://localhost:3000";
app.use(session({ secret: 'very secret' }));
app.use(bodyParser.urlencoded({ extended: true }));

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

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asrs2017',
    database: 'warehouse'
});

connection.connect((err) => {
    if (err) {
        console.log("No se puede conectar a base de datos MySQL");
        throw err
    }
    console.log("Conectado a base de datos");
});


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// // HOME.
app.get('/', (req, res) => {
    // res.locals.user = req.session.user;
    // res.render('pages/index');
    res.locals.user = req.session.user;
    connection.query('SELECT * from products', function (error, results, fields) {
        if (error) throw error;
        res.render('pages/index', {
            title: "Shop",
            products: results
        })
        console.log(results);
    });
});


app.get('/about', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/about');
});


app.get('/ingresos', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/ingresos');
});


app.get('/salidas', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/salidas');
});


// // LOGIN
// app.get('/login', (req, res) => {
//     res.render('login', { title: "Login" });
// });
// app.post('/login', (req, res) => {
//     console.log(req.body);
//     let usr = req.body;
//     // Cambiar customers por usuarios
//     connection.query(`SELECT * from usuarios where username="${usr.uname}"`, (err, rows, fields) => {
//         if (!err) {
//             console.log('The solution is: ', rows[0]);
//             if (typeof rows[0] != 'undefined' && pwVerify(usr.pwd, rows[0].password)) {
//                 console.log("Login exitoso");
//                 req.session.user = {
//                     id: rows[0].id,
//                     username: rows[0].username,
//                 };
//                 res.redirect('/');
//             } else {
//                 res.render('login', { title: "Login falló. Intenta nuevamente", failed: true });
//             }
//         }
//         else throw err;
//     });
// });


// REGISTRO
app.get('/registro', (req, res) => {
    res.render('registro', { title: 'Registro' });
});
app.post('/registro', (req, res) => {
    console.log(req.body);
})




app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(3000);