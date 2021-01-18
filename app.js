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
app.use(cors({origin: ''}));

// APP
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));


let routes = require('./src/routes/router');
app.use(auth);
routes(app);


const connection = require('./src/configs/db');
// const { salidas } = require('./src/controllers/category');






app.use((req, res, next) => {
    res.status(404).render('pages/404', { title: "ERROR 404" });
});

app.listen(port, () => {
    console.log("Server started at port " + port)
    console.log(`http://${host}:${port}`)
});

function auth(req, res, next) {
    res.locals.user = req.session.user;
    next();
}

