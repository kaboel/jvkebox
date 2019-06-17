const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

function generateToken(user) {
    const EXPIRED = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: EXPIRED
    })
}

function comparePassword(data) {
    const password = data.password;
    const hashed = data.hashed;

    return bcrypt.compareSync(password, hashed);
}

module.exports = {
    async register(req, res) {
        await User.create(req.body)
            .then(user => {
                const userJSON = user.toJSON();
                res.send({
                    user: userJSON,
                    token: generateToken(userJSON)
                })
            })
            .catch(err => {
                res.status(400).send({
                    error: `This email account is already in use.`
                })
            })
    },

    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        await User.findOne({
            where: {email: email}
        }).then(user => {
            if(!user) {
                return res.status(400).send({
                    error: 'Given Email address is not found.'
                })
            }

            const isPassValid = comparePassword({
                password: password,
                hashed: user.password
            });

            if(isPassValid) {
                const userJSON = user.toJSON();
                res.send({
                    user: userJSON,
                    token: generateToken(userJSON)
                })
            } else {
                return res.status(403).send({
                    error: 'Given Password is incorrect.'
                })
            }

        }).catch(err => {
            res.status(500).send({
                error: 'Something is wrong, please try again later.'
            })
        })
    }
}
