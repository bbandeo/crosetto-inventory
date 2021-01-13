const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
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

warehouser_routes(app);
category_routes(app);
user_route(app);


app.get('/about', (req, res) => {
    res.locals.user = req.session.user;
    res.render('pages/about', { title: 'About' });
});

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.status(404).render('pages/404', { title: "ERROR 404" });
});

app.listen(port, () => {
    console.log("Server started at port " + port)
    console.log(`http://${host}:${port}`)
});
