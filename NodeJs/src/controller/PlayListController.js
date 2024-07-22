const PlayList = require('../model/PlayList');
const ZingMp3 = require('zingmp3-api-full');
const Account = require('../model/Account');
class PlayListController {
  async CreateMyPlaylist(req, res) {
    try {
      console.log(req.body);
      const playList = new PlayList(req.body);
      await playList.save();
      return res.status(200).json(playList);
    } catch (error) {
      console.log(error);
    }
  }

  async GetSuggest(req, res) {
    try {
      const zingMp3 = new ZingMp3();
      zingMp3.getRecommend().then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async AddMusicOnPlayList(req, res) {
    try {
      const playList = await PlayList.findOneAndUpdate(
        {
          id: req.body.id,
        },
        {
          listIdMusics: req.body.myPlaylist,
        },
      );
      const newPlayList = await PlayList.findOne({
        id: req.body.id,
      });
      return res.status(200).json(newPlayList);
    } catch (error) {
      console.log(error);
    }
  }

  async DeletePlayList(req, res) {
    try {
      const playlist = await PlayList.findOneAndDelete({
        id: req.body.id,
      });
      const updateUser = await Account.findOneAndUpdate(
        {
          id: req.body.idUser,
        },
        {
          MyPlayList: req.body.MyPlayList,
        },
      );
      if (updateUser) {
        const user = await Account.findOne({
          id: req.body.idUser,
        });
        return res.status(200).json({
          messages: 'success',
          user: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PlayListController();
