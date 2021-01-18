module.exports = app => {

    let warehouserList = require('../controllers/warehouser');
    let categoryList = require('../controllers/category');
    let userList = require('../controllers/user');

    app.route('/registro').get(categoryList.registro);
    app.route('/ingresos').get(categoryList.ingresos);
    app.route('/salidas').get(categoryList.salidas);
    app.route('/login').get(categoryList.login);

    app.route('/').get(userList.home);
    app.route('/login').post(userList.login);
    app.route('/logout').get(userList.logout);
    app.route('/register').post(userList.register);
    app.route('*').get(userList.notFound);

    app.route('/').post(warehouserList.search);
    app.route('/ingresos').post(warehouserList.ingresos);
    app.route('/codbar').post(warehouserList.codbar);
    app.route('/insert').post(warehouserList.insert);
};