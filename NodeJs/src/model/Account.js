const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountModel = new Schema(
  {
    id: String,
    name: String,
    email: String,
    password: String,
    avatar: String,
    gender: String,
    birthday: String,
    avatar: String,
    MyPlayList: Array,
    MyFavourites: {
      listAlbum: Array,
      listMV: Array,
      listMusic: Array,
    },
    MyRecent: {
      listAlbum: Array,
      listMV: Array,
      listMusic: Array,
    },
  },
  {
    timestamps: true,
    collection: 'AccountModel',
  },
);

module.exports = mongoose.model('AccountModel', AccountModel);
