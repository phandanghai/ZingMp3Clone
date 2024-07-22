import style from './ListFavourites.module.scss';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiGetListMusic } from '../../../redux/ApiAccount';
import MusicPopup from '../../Modal/MusicModal/MusicPopup';
import { BsFillPlayFill } from 'react-icons/bs';
import { PiMicrophoneStageDuotone } from 'react-icons/pi';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { CgMoreAlt } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import {
  HandleEditArtistLink,
  HandlePlayingMusicOnPlaylist,
  HandleAddPlaylistOnMyRecent,
} from '../../../AllFunctions/AllFunctions';
import { setMusicPopup, setSong } from '../../../redux/musicSlider';
import { setIsPlaying } from '../../../redux/stateSlider';
import {
  ApiAddMusicOnMyFavourites,
  ApiAddAlbumOnMyFavourites,
} from '../../../redux/ApiAccount';
import { ApiGetDetalListAlbum } from '../../../redux/ApiMusic';
function ListFavourites() {
  const dispatch = useDispatch();
  const musicPopupRef = useRef();
  const RecentHeader = ['Bài hát', 'playlist', 'mv', 'radio'];
  const listTyped = [
    {
      type: 'Yêu thích',
      link: '/mymusic/danh-sach-yeu-thich',
    },
    {
      type: 'Tải lên',
      link: '/mymusic/danh-sach-yeu-thich/da-tai-len',
    },
  ];
  const [header, setHeader] = useState('Bài hát');
  const [typed, setTyped] = useState('Yêu thích');
  const [listMusic, setListMusic] = useState([]);
  const [listAlbum, setListAlbum] = useState([]);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const user = useSelector((state) => state.account.account);
  const songs = useSelector((state) => state.music.song);
  const playList = useSelector((state) => state.music.playList);
  const params = useSelector((state) => state.music.params);
  useEffect(() => {
    console.log(params);
    if (params === 'mymusic/danh-sach-yeu-thich/album') {
      setHeader('playlist');
    }
    if (params === 'mymusic/danh-sach-yeu-thich/da-tai-len') {
      setHeader('Bài hát');
      setTyped('Tải lên');
    }
  }, [params]);
  useEffect(() => {
    const padZero = (num) => {
      return (num < 10 ? '0' : '') + num;
    };
    const setTimes = (duration) => {
      const minutes = padZero(Math.floor(duration / 60));
      const seconds = padZero(Math.floor(duration % 60));
      return `${minutes}:${seconds}`;
    };
    if (header === 'Bài hát' && typed === 'Yêu thích') {
      console.log(user?.MyFavourites?.listMusic);
      ApiGetListMusic(user?.MyFavourites?.listMusic).then((result) => {
        const res = result.map((music) => {
          return {
            ...music,
            time: setTimes(padZero(music.duration)),
          };
        });
        setListMusic(res);
      });
    } else if (header === 'playlist') {
      ApiGetDetalListAlbum(user?.MyFavourites?.listAlbum).then((result) => {
        setListAlbum(result);
      });
    }
  }, [header]);

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ state: false, id: null, type: null }));
  };

  const HandleAddAlbumOnMyFavourites = (id) => {
    ApiAddAlbumOnMyFavourites(dispatch, {
      id: localStorage.getItem('id'),
      data: [...user?.MyFavourites?.listAlbum, id],
    });
  };

  const HandleRemoveAlbumOnMyFavourites = (id) => {
    ApiAddAlbumOnMyFavourites(dispatch, {
      id: localStorage.getItem('id'),
      data: user?.MyFavourites?.listAlbum.filter((encodeId) => encodeId !== id),
    });
  };

  const HandleAddMusicOnMyFavourites = (id) => {
    ApiAddMusicOnMyFavourites(dispatch, {
      id: localStorage.getItem('id'),
      data: [...user?.MyFavourites?.listMusic, id],
    });
  };

  const HandleRemoveMusicOnMyFavourites = (id) => {
    ApiAddMusicOnMyFavourites(dispatch, {
      id: localStorage.getItem('id'),
      data: user?.MyFavourites?.listMusic?.filter((num) => num !== id),
    });
  };

  const runFunctions = async (id, index) => {
    try {
      await HandlePlayingMusicOnPlaylist(dispatch, id, index);
      await HandleAddPlaylistOnMyRecent(dispatch, user, id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(listMusic);
  return (
    <div className={style['ListFavourites']}>
      <header>
        {RecentHeader.map((title) => {
          return (
            <div
              key={title}
              className={style['title']}
              style={header === title ? { borderBottom: '3px solid #9b4de0' } : null}
              onClick={() => setHeader(title)}
            >
              <h3 style={header === title ? { color: '#fff' } : null}>{title}</h3>
            </div>
          );
        })}
      </header>

      <main>
        {header === 'Bài hát' && (
          <div className={style['typed']}>
            {listTyped.map((type) => {
              return (
                <Link
                  to={`${type.link}`}
                  className={style['btn']}
                  key={type.link}
                  style={
                    typed === type.type
                      ? { backgroundColor: '#9b4de0', border: 'none' }
                      : null
                  }
                  onClick={() => setTyped(type.type)}
                >
                  <h4>{type.type}</h4>
                </Link>
              );
            })}
          </div>
        )}

        {header === 'Bài hát' && typed === 'Yêu thích' && (
          <div className={style['listMusic']}>
            {listMusic?.map((item, index) => {
              return (
                <div key={index} className={style['item']}>
                  {musicPopup.state &&
                    musicPopup.id === item?.encodeId &&
                    musicPopup.type === 'recents' && (
                      <div className={style['popup']} ref={musicPopupRef}>
                        <MusicPopup music={item} HandleClosePopup={HandleClosePopup} />
                      </div>
                    )}

                  <div
                    className={style['play']}
                    style={songs.id === item.encodeId ? { display: 'block' } : null}
                  >
                    {songs.id === item.encodeId && isPlaying ? (
                      <i
                        className={clsx(style.playingGif)}
                        onClick={() => dispatch(setIsPlaying(false))}
                      />
                    ) : (
                      <BsFillPlayFill
                        className={style['icon']}
                        onClick={() => {
                          if (songs.id === item.encodeId) {
                            dispatch(setIsPlaying(true));
                          } else {
                            dispatch(setSong({ id: item.encodeId, state: true }));
                            dispatch(setIsPlaying(true));
                          }
                        }}
                      />
                    )}
                  </div>
                  <div className={style['option']}>
                    <div className={style['mic']}>
                      <PiMicrophoneStageDuotone className={style['icon']} />
                    </div>
                    {user?.MyFavourites?.listMusic.includes(item.encodeId) ? (
                      <div className={style['love']}>
                        <FaHeart
                          className={style['icon']}
                          onClick={() => HandleRemoveMusicOnMyFavourites(item?.encodeId)}
                        />
                      </div>
                    ) : (
                      <div className={style['like']}>
                        <CiHeart
                          className={style['icon']}
                          onClick={() => HandleAddMusicOnMyFavourites(item?.encodeId)}
                        />
                      </div>
                    )}
                    <div
                      className={style['more']}
                      onClick={() =>
                        dispatch(
                          setMusicPopup({
                            state: true,
                            id: item?.encodeId,
                            type: 'recents',
                          }),
                        )
                      }
                    >
                      <MdOutlineMoreHoriz className={style['icon']} />
                    </div>
                  </div>
                  <div className={style['image']}>
                    <img src={item?.thumbnail} alt="" />
                  </div>
                  <div className={style['info']}>
                    <Link className={style['title']} to={`${item.link}`}>
                      {item?.title}
                    </Link>
                    <div className={style['listArists']}>
                      {item?.artists.slice(0, 3).map((artist, index) => {
                        return (
                          <Link to={`${HandleEditArtistLink(artist.link)}`} key={index}>
                            <span>
                              {artist.name}{' '}
                              {index !== 0 && index < item?.artists.length - 1
                                ? `,`
                                : null}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className={style['album']}>
                    <Link to={`${item?.album?.link}`}>
                      <p>{item?.album?.title}</p>
                    </Link>
                  </div>

                  <div
                    className={style['time']}
                    style={
                      musicPopup.state && musicPopup.id === item.encodeId
                        ? { display: 'none' }
                        : null
                    }
                  >
                    <h4>{item?.time}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {header === 'playlist' && (
          <div className={style['playlist']}>
            {listAlbum?.map((item, index) => {
              return (
                <div key={index} className={style['item']}>
                  <div
                    className={style['option']}
                    to={item.link}
                    style={playList.id === item.encodeId ? { display: 'flex' } : null}
                  >
                    <Link to={item.link}>
                      <div className={style['link']}></div>
                    </Link>
                    {user?.MyFavourites?.listAlbum.includes(item.encodeId) ? (
                      <FaHeart
                        className={style['love']}
                        onClick={() => HandleRemoveAlbumOnMyFavourites(item.encodeId)}
                      />
                    ) : (
                      <AiOutlineHeart
                        className={style['like']}
                        onClick={() => HandleAddAlbumOnMyFavourites(item.encodeId)}
                      />
                    )}
                    <div>
                      {playList.id === item.encodeId && isPlaying ? (
                        <i
                          className={style['playing']}
                          style={{ marginLeft: 5, marginTop: 5 }}
                          onClick={() => dispatch(setIsPlaying(false))}
                        ></i>
                      ) : (
                        <BsFillPlayFill
                          className={style['play']}
                          onClick={() => {
                            if (playList.id === item.encodeId) {
                              dispatch(setIsPlaying(true));
                            } else {
                              runFunctions(item.encodeId);
                            }
                          }}
                        />
                      )}
                    </div>
                    <CgMoreAlt
                      className={style['more']}
                      onClick={() => {
                        setIsPopup({ id: item.encodeId, state: true });
                      }}
                    />
                  </div>
                  <div className={style['image']}>
                    <img src={item?.thumbnail} alt="" />
                  </div>
                  {item?.sortDescription.length > 20 ? (
                    <Link
                      to={`${item?.link}`}
                      className={style['itemTitle']}
                    >{`${item?.title.substring(0, 20)} ...`}</Link>
                  ) : (
                    <h5 className={style['itemTitle']}>{item?.title}</h5>
                  )}
                  <div className={style['listArist']}>
                    {item?.artists.slice(0, 2).map((artist, index) => {
                      return (
                        <Link to={`${HandleEditArtistLink(artist.link)}`} key={index}>
                          <span>
                            {artist.name}{' '}
                            {index !== 0 && index < item?.artists.length - 1 ? `,` : null}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default ListFavourites;
