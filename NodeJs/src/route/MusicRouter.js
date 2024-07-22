const MusicController = require('../controller/MusicController');
const express = require('express');

const router = express.Router();

router.get('/getHome', MusicController.getHome);
router.post('/getPlayList', MusicController.getPlayList);
router.post('/getArtists', MusicController.getArtists);
router.post('/getListSongArtists', MusicController.getDetalArtist);
router.get('/getVideo', MusicController.getVideoSong);
router.post('/getSong', MusicController.getSong);
router.post('/getSongInfo', MusicController.getSongInfo);
router.get('/getCategory', MusicController.getCategory);
router.get('/getTop100', MusicController.getTop100);
router.post('/search', MusicController.search);
router.post('/getListMusic', MusicController.GetListMusic);
router.post('/getListAlbum', MusicController.GetListAlbum);
router.post('/getListMusicOnPlaylist', MusicController.getListMusicOnPlaylist);

module.exports = router;
