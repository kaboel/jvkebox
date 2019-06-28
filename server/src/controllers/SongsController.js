const { Song } = require('../models');

module.exports = {
    async index(req, res) {
        await Song.findAll({
            limit: 10
        }).then(songs => {
            res.send(songs);
        }).catch(err => {
            res.status(500).send({
                error: `Failed to retrieve songs - ${err.message}.`
            })
        })
    },

    async create(req, res) {
        await Song.create(req.body)
            .then(song => {
                res.send(song.toJSON());
            })
            .catch(err => {
                res.status(500).send({
                    error: `Failed to add new song entry - ${err.message}.`
                })
            })
    }
};
