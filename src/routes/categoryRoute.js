module.exports = app => {
	let todoList = require('../controllers/category');

    app.route('/registro').get(todoList.registro);
    app.route('/ingresos').get(todoList.ingresos);
    app.route('/salidas').get(todoList.salidas);
    app.route('/login').get(todoList.login);
};