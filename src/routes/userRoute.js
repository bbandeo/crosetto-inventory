module.exports = app => {
	let todoList = require('../controllers/user');

	app.route('/').get(todoList.home);
	app.route('/login').post(todoList.login);
	app.route('/logout').get(todoList.logout);
	app.route('/register').post(todoList.register);
	app.route('*').get(todoList.notFound);
};