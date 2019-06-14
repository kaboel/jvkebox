const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const App = express();
App.use(morgan('combined'));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(cors());

App.get('/status', (req, res) => {
    res.send({
        message: 'hello world'
    })
});

App.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}! HTTP REQUEST SUCCESS !!`
    })
});

App.listen(process.env.PORT || 8081, () => {
    console.log('Express server started on port: 8081')
});
