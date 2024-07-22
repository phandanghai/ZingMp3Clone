const { ZingMp3 } = require('zingmp3-api-full');
const Playlist = require('../model/PlayList');
class MusicController {
  getHome(req, res) {
    ZingMp3.getHome().then((data) => {
      res.status(200).json(data);
    });
  }

  getPlayList(req, res) {
    ZingMp3.getDetailPlaylist(req.body.id).then((data) => {
      res.status(200).json(data);
    });
  }

  async getArtists(req, res) {
    const artists = req.body;
    try {
      const promises = artists.map((artist) => ZingMp3.getArtist(artist));
      const data = await Promise.all(promises);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getDetalArtist(req, res) {
    console.log(req.body);
    // try {
    //     const promise = req.body.map((artist) => ZingMp3.getListArtistSong(artist, '1', '15'));
    //     const data = await Promise.all(promise);
    //     return res.status(200).json(data);
    // } catch (error) {
    //     console.log(error);
    // }
  }

  getVideoSong(req, res) {
    ZingMp3.getVideo('ZWEW9WI8').then((data) => {
      return res.status(200).json(data);
    });
  }

  getSong(req, res) {
    ZingMp3.getSong(req.body.id).then((data) => {
      return res.status(200).json(data);
    });
  }

  getSongInfo(req, res) {
    ZingMp3.getInfoSong(req.body.id).then((data) => {
      return res.status(200).json(data);
    });
  }

  getCategory(req, res) {
    ZingMp3.getListArtistSong('IWZ9Z08I', '1', '15').then((data) => {
      return res.status(200).json(data);
    });
  }

  getTop100(req, res) {
    ZingMp3.getTop100().then((data) => {
      return res.status(200).json(data);
    });
  }

  async search(req, res) {
    try {
      console.log(req.body);
      const data = await ZingMp3.search(req.body.data);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getListMusicOnPlaylist(req, res) {
    try {
      const myPlayList = await Playlist.findOne({
        id: req.body.id,
      });
      if (myPlayList) {
        const listData = myPlayList.listIdMusics.map(async (music) => {
          try {
            const data = await ZingMp3.getInfoSong(music);
            return data.data;
          } catch (error) {
            console.log(error);
            return null;
          }
        });

        const allData = await Promise.all(listData);
        return res.status(200).json({
          message: 'Get info music in My Playlist',
          myPlayList: { ...myPlayList, listDetalMusic: allData },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async GetListMusic(req, res) {
    const listIds = req.body;
    console.log(listIds);
    try {
      if (listIds.length > 0) {
        const listData = await Promise.all(
          listIds?.map(async (id) => {
            try {
              const data = await ZingMp3.getInfoSong(id);
              return data.data;
            } catch (error) {
              console.log(error);
              return null;
            }
          }),
        );
        return res.status(200).json(listData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async GetListAlbum(req, res) {
    const listIds = req.body;
    try {
      if (listIds.length > 0) {
        const listData = await Promise.all(
          listIds?.map(async (id) => {
            try {
              const data = await ZingMp3.getDetailPlaylist(id);
              return data.data;
            } catch (error) {
              console.log(error);
              return null;
            }
          }),
        );
        return res.status(200).json(listData);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MusicController();
