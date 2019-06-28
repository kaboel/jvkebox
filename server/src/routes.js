const AuthController = require('./controllers/AuthController');
const SongsController = require('./controllers/SongsController');

const AuthValidator = require('./middleware/AuthValidator');

module.exports = (App) => {
    App.post('/register',
        AuthValidator.register,
        AuthController.register
    );
    App.post('/login', AuthController.login);

    App.get('/songs', SongsController.index);
    App.post('/songs', SongsController.create);
};
