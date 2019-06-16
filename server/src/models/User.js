const bcrypt = require('bcrypt');

async function encrypt(user, options) {
    const SALT_ROUNDS = 10;

    return await bcrypt
        .genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(user.password, salt, null))
        .catch(err => {
            console.log(err.message)
        })
        .then(hash => user.setDataValue('password', hash))
        .catch(err => {
            console.log(err.message)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: encrypt,
            beforeUpdate: encrypt,
        }
    });

    return User;
};


