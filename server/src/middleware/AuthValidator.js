const Joi = require('joi');

module.exports = {
    register (req, res, next) {
        const schema = {
            name: Joi.string().min(8).max(32),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        };

        const {error, value} = Joi.validate(req.body, schema);

        if(!error) {
            next() // proceed
        } else {
            switch (error.details[0].context.key) {
                case 'name':
                    res.status(400).send({
                        error: 'Name must be more than equals 8 and less than equals 32 characters'
                    });
                    break;

                case 'email':
                    res.status(400).send({
                        error: 'Email address must be a valid Email address.'
                    });
                    break;

                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain only lower-case, upper-case, numeric.
                        <br>
                        2. It must be more than equals 8 and less than equals 32 characters`
                    });
                    break;

                default:
                    res.status(400).send({
                        error: error.message
                    });
                    break;
            }
        }
    }
}
