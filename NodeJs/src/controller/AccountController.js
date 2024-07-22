const Account = require('../model/Account');
const PlayList = require('../model/PlayList');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const { ZingMp3 } = require('zingmp3-api-full');
require('dotenv').config();
const CreateAccessToken = (user) => {
  return jwt.sign(
    {
      user: user,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: '30s',
    },
  );
};

const CreateRefreshToken = (user) => {
  return jwt.sign(
    {
      user: user,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: '365d',
    },
  );
};

class AccountController {
  Example(req, res) {
    return res.status(200).json({
      message: 'Welcome to ZingMp3 API',
      id: req.body.id,
      user: req.user,
    });
  }
  async checkUser(req, res) {
    try {
      const user = await Account.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(200).json({
          messages: 'existing user',
        });
      } else {
        return res.status(200).json({
          messages: 'new user',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async register(req, res) {
    try {
      const isAccount = await Account.findOne({
        email: req.body.email,
      });

      console.log(isAccount);
      if (!isAccount) {
        const id = uuidv4();
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const account = new Account({
          id: id,
          email: req.body.email,
          password: hashPassword,
          name: req.body.name,
          birthday: req.body.birthday,
          gender: req.body.gender,
          avatar:
            'https://res.cloudinary.com/drvdebpw2/image/upload/v1713176696/n5yjzqxcsofmies4q0on.png',
        });
        await account.save();
        return res.status(200).json({
          status: 'success',
          account: account,
        });
      } else {
        return res.status(200).json({
          message: 'failed',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changeAvatar(req, res) {
    try {
      console.log(req.body.avatar);
      if (req.body.avatar) {
        const avatar_url = await cloudinary.uploader.upload(req.body.avatar);
        if (avatar_url) {
          const update = await Account.findOneAndUpdate(
            {
              id: req.body.id,
            },
            {
              avatar: avatar_url.url,
            },
          );
          if (update) {
            const user = await Account.findOne({
              id: req.body.id,
            });
            return res.status(200).json({
              messages: 'success',
              user: user,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const user = await Account.findOne({
        email: req.body.email,
      });
      if (user) {
        const isMatch = await bcrypt.compareSync(req.body.password, user.password);
        if (isMatch) {
          const { password, ...userWithoutPassword } = user.toObject();
          const accessToken = CreateAccessToken(userWithoutPassword);
          const refreshToken = CreateRefreshToken(userWithoutPassword);
          res.cookie('accessToken', accessToken);
          return res.status(200).json({
            messages: 'success',
            refreshToken: refreshToken,
            user: userWithoutPassword,
          });
        } else {
          return res.status(200).json({
            messages: 'password error',
          });
        }
      } else {
        return res.status(200).json({
          messages: 'user not found',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async AddMyPlayList(req, res) {
    try {
      const user = await Account.findOneAndUpdate(
        {
          id: req.body.id,
        },
        {
          MyPlayList: req.body.myPlayList,
        },
      );

      const newUser = await Account.findOneAndUpdate({
        id: req.body.id,
      });
      return res.status(200).json({
        messages: 'success',
        user: newUser,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getMyPlayList(req, res) {
    try {
      const myPlayList = await PlayList.find({
        idUser: req.body.id,
      });
      return res.status(200).json({
        messages: 'success',
        myPlayList: myPlayList,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async RefreshTokenByUser(req, res) {
    try {
      const resfreshToken = req.body.refreshToken;
      if (resfreshToken) {
        const decode_token = jwt.verify(resfreshToken, process.env.REFRESH_TOKEN_KEY);
        if (decode_token) {
          const user = await Account.findOne({
            id: decode_token.user.id,
          });
          if (user) {
            const { password, ...userWithoutPassword } = user.toObject();
            const accessToken = CreateAccessToken(userWithoutPassword);
            const refreshToken = CreateRefreshToken(userWithoutPassword);
            res.cookie('accessToken', accessToken);
            return res.status(200).json({
              messages: 'success',
              refreshToken: refreshToken,
              accessToken: accessToken,
              user: userWithoutPassword,
            });
          } else {
            return res.status(401).json({ message: 'User is not valid' });
          }
        }
      } else {
        return res.status(403).json({ message: 'Token not provided' });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async GetDetalPlayList(req, res) {
    try {
      const myPlayList = await PlayList.findOne({
        id: req.body.id,
      });
      return res.status(200).json({
        messages: 'success',
        myPlayList: myPlayList,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async ChangeMusicOnMyFavourites(req, res) {
    try {
      const { id, data } = req.body;
      const user = await Account.findOne({
        id: id,
      });
      if (user) {
        const updateUser = await Account.findOneAndUpdate(
          {
            id: id,
          },
          {
            MyFavourites: { ...user.MyFavourites, listMusic: data },
          },
        );
      }

      const newUser = await Account.findOne({
        id: req.body.id,
      });

      if (newUser) {
        return res.status(200).json({
          messages: 'success',
          user: newUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async ChangeAlbumOnMyFavourites(req, res) {
    try {
      console.log(req.body);
      const user = await Account.findOne({
        id: req.body.id,
      });
      if (user) {
        const updateUser = await Account.findOneAndUpdate(
          {
            id: req.body.id,
          },
          {
            MyFavourites: { ...user.MyFavourites, listAlbum: req.body.data },
          },
        );
      }

      const newUser = await Account.findOne({
        id: req.body.id,
      });

      if (newUser) {
        return res.status(200).json({
          messages: 'success',
          user: newUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async AddMusicOnRecentMusic(req, res) {
    try {
      const user = await Account.findOne({
        id: req.body.id,
      });

      const updateUser = await Account.findOneAndUpdate(
        {
          id: req.body.id,
        },
        {
          MyRecent: { ...user.MyRecent, listMusic: req.body.data },
        },
      );

      if (updateUser) {
        const newUser = await Account.findOne({
          id: req.body.id,
        });
        if (newUser) {
          return res.status(200).json({
            messages: 'success',
            user: newUser,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async AddAlbumOnRecentMusic(req, res) {
    try {
      const user = await Account.findOne({
        id: req.body.id,
      });

      const updateUser = await Account.findOneAndUpdate(
        {
          id: req.body.id,
        },
        {
          MyRecent: { ...user.MyRecent, listAlbum: req.body.data },
        },
      );

      if (updateUser) {
        const newUser = await Account.findOne({
          id: req.body.id,
        });
        if (newUser) {
          return res.status(200).json({
            messages: 'success',
            user: newUser,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async GetListPlaylist(req, res) {
    try {
      const listIds = req.body;
      console.log(listIds);
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
    } catch (error) {
      console.log(error);
    }
  }

  async GetListMusic(req, res) {
    try {
      const listIds = req.body;
      console.log(listIds);
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
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AccountController();
