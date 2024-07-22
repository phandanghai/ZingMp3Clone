const AccountController = require('../controller/AccountController');
const express = require('express');
const middlewareController = require('../middlewareController/middilewares');
const upload = require('../cloudinary/multer');
const router = express.Router();

router.post('/', AccountController.Example);
router.post('/checkUser', AccountController.checkUser);
router.post('/updateAvatar', upload.single('images'), AccountController.changeAvatar);
router.post('/register', AccountController.register);
router.post('/login', AccountController.login);
router.post('/RefreshTokenByUser', AccountController.RefreshTokenByUser);
router.post('/add-my-playlist', AccountController.AddMyPlayList);
router.post('/get-my-playlist', AccountController.getMyPlayList);
router.post('/get-detal-playlist', AccountController.GetDetalPlayList);
router.post('/addMusicOnRecent', AccountController.AddMusicOnRecentMusic);
router.post('/addAlbumOnRecent', AccountController.AddAlbumOnRecentMusic);
router.post('/getListAlbum', AccountController.GetListPlaylist);
router.post('/getListMusic', AccountController.GetListMusic);
router.post(
  '/changeMusicOnMyFavourites',
  middlewareController.authenticationUser,
  AccountController.ChangeMusicOnMyFavourites,
);
router.post(
  '/changeAlbumOnMyFavourites',
  // middlewareController.verifyToken,
  AccountController.ChangeAlbumOnMyFavourites,
);

module.exports = router;
