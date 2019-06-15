const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');

const App = express();
App.use(morgan('combined'));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(cors());

require('./routes')(App);

sequelize.sync().then(() => {
    App.listen(config.port, () => {
        console.log(`Express server started on port: ${config.port} ...`)
    });
});
