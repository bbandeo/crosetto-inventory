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
app.use(express.static('static'));

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
app.get('/', (req, res) => {
    res.locals.user = req.session.user;
    connection.query('SELECT * from piezas', (error, results, fields) => {
        if (error) throw error;
        res.render('index', {
            title: "Inventario",
            piezas: results
        })
    })
})

