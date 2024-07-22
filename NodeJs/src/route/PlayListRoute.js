const PlayListController = require('../controller/PlayListController');
const express = require('express');

const router = express.Router();

router.post('/createPlayList', PlayListController.CreateMyPlaylist);
router.get('/getSuggest', PlayListController.GetSuggest);
router.post('/deletePlayList', PlayListController.DeletePlayList);
router.post('/addMusicOnPlayList', PlayListController.AddMusicOnPlayList);

module.exports = router;
