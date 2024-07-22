const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayListModel = new Schema(
    {
        id: String,
        idUser: String,
        name: String,
        isPublic: Boolean,
        isRandom: Boolean,
        listIdMusics: Array,
        alias: String,
        avatar: String,
    },
    {
        timestamps: true,
        collection: 'PlayListModel',
    },
);

module.exports = mongoose.model('PlayListModel', PlayListModel);
