const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.locals.baseUrl = `http://${host}:${port}`;
app.use(session({ secret: 'very secret' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.text({ type: "text/plain" })); // use this instead
app.use(cors({
    origin: ''
}));

// APP
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

var category_routes = require('./src/routes/categoryRoute');
var user_route = require('./src/routes/userRoute');
var warehouser_routes = require('./src/routes/warehouserRoute');

app.use(auth);
warehouser_routes(app);
category_routes(app);
user_route(app);

const connection = require('./src/configs/db');
const { salidas } = require('./src/controllers/category');


app.post("/", function (req, res) {
    let { search, valor } = req.body;
    console.log(req.body); // { search: 'Articulo', valor: '33',}
    console.log("Post");


    // SELECT column_name(s)
    // FROM table1
    // INNER JOIN table2
    // ON table1.column_name = table2.column_name;


    connection.query(`SELECT * from info_articulo INNER JOIN articulo ON info_articulo.codbar = articulo.codbar WHERE info_articulo.codbar = ${valor} `, (error, results, fields) => {
        if (error) throw error;
        const respuesta = [];
    

        results.forEach((i) => {
            respuesta.push({
               id: i.id, 
               codbar: i.codbar,
               tipo: i.tipo,
               marca: i.marca,
               modelo: i.modelo,
               observaciones: i.observaciones,
               tamano: i.tamano,
               created_at: i.created_at,
               updated_at: i.updated_at,
               deleted_at: i.deleted_at,
               descripcion: i.descripcion,
               nombre: i.nombre,
               operario_ingreso: i.operario_ingreso,
               operario_retiro: i.operario_retiro, 
               fecha_alta: i.fecha_alta, 
               fecha_baja: i.fecha_baja, 
               subconjunto: i.subconjunto, 
               ubicacion_almacen: i.ubicacion_almacen,
               proveedor_: i.proveedor_, 
               destino: i.destino
            })
        });
        console.log(respuesta.length);
        res.render('pages/index', {
            title: `BIENVENIDO`,
            respuestas: respuesta
        });

    });


    // var sqlStatement = req.body.sql;
    // connection.connect(function(err) {
    //     if (err) {
    //         console.error('error connecting: ' + err.stack);
    //         return;
    //     }
    //     console.log('connected as id ' + connection.threadId);
    // });
    // if (err) {
    //     throw err;
    // } else {
    //     obj = {
    //         print: result
    //     };
    //     res.render('query', obj);
    // }
});

app.use((req, res, next) => {
    res.status(404).render('pages/404', { title: "ERROR 404" });
});

app.listen(port, () => {
    console.log("Server started at port " + port)
    console.log(`http://${host}:${port}`)
});

function auth(req, res, next) {
    res.locals.user = req.session.user;
    console.log("auth")
    next();
}

