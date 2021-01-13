module.exports = app => {
	let todoList = require('../controllers/warehouser');

    app.route('/ingresos').post(todoList.ingresos);
	app.route('/codbar').post(todoList.codbar);
	app.route('/insert').post(todoList.insert);
};