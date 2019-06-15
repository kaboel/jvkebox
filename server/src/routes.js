const AuthController = require('./controllers/AuthController');
const AuthValidator = require('./controllers/AuthValidator');

module.exports = (App) => {
    App.post('/register',
        AuthValidator.register,
        AuthController.register
    );
}
