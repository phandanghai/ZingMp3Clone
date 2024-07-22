import style from './Recent.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiGetPlayList } from '../../redux/ApiMusic';
import { ApiGetListAlbum, ApiGetListMusic } from '../../redux/ApiAccount';
import { Link } from 'react-router-dom';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { PiMicrophoneStageDuotone } from 'react-icons/pi';
import { CgMoreAlt } from 'react-icons/cg';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { setMusicPopup, setPlayList, setSong } from '../../redux/musicSlider';
import MusicPopup from '../Modal/MusicModal/MusicPopup';
import { setIsPlaying } from '../../redux/stateSlider';
import { ApiAddAlbumOnMyFavourites } from '../../redux/ApiAccount';
import { ApiAddMusicOnMyFavourites } from '../../redux/ApiAccount';
import {
  HandlePlayingMusicOnPlaylist,
  HandleAddPlaylistOnMyRecent,
} from '../../AllFunctions/AllFunctions';
function Reccent() {
  const dispatch = useDispatch();
  const musicPopupRef = useRef();
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const user = useSelector((state) => state.account.account);
  const RecentHeader = ['Bài hát', 'playlist', 'mv', 'radio'];
  const [header, setHeader] = useState('Bài hát');
  const [listAlbum, setListAlbum] = useState([]);
  const [listMusic, setListMusic] = useState([]);
  const playList = useSelector((state) => state.music.playList);
  const songs = useSelector((state) => state.music.song);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const params = useSelector((state) => state.music.params);

  useEffect(() => {
    console.log(params);
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
    if (header === 'playlist') {
      setListMusic([]);
      ApiGetListAlbum(user?.MyRecent?.listAlbum).then((result) => {
        setListAlbum(result);
      });
    } else if (header === 'Bài hát') {
      setListAlbum([]);
      ApiGetListMusic(user?.MyRecent?.listMusic).then((result) => {
        console.log(result);
        const listMusic = result.map((music) => {
          return {
            ...music,
            time: setTimes(padZero(music.duration)),
          };
        });
        setListMusic(listMusic);
      });
    }
  }, [header]);

  const runFunctions = async (id, index) => {
    try {
      await HandlePlayingMusicOnPlaylist(dispatch, id, index);
      await HandleAddPlaylistOnMyRecent(dispatch, user, id);
    } catch (error) {
      console.log(error);
    }
  };

  const EditLinkToArtist = (artist) => {
    if (artist.includes('/nghe-si')) {
      return artist;
    } else {
      return `/nghe-si${artist}`;
    }
  };

  useEffect(() => {
    const HandleClickOutSide = (e) => {
      if (musicPopupRef.current && !musicPopupRef.current.contains(e.target)) {
        dispatch(setMusicPopup({ state: false, id: null, type: null }));
      }
    };
    window.addEventListener('mousedown', HandleClickOutSide);
    return () => {
      window.removeEventListener('mousedown', HandleClickOutSide);
    };
  }, [musicPopupRef]);

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
  return (
    <div className={style['Reccent']}>
      <header>
        <div className={style['header']}>
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
        </div>
      </header>

      <div className={style['main']}>
        {((header === 'Bài hát' && listMusic.length === 0) ||
          (header === 'playlist' && listAlbum.length === 0)) && (
          <div className={style['loading']}>
            <div className={style['spinner']}></div>
          </div>
        )}
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
                      <Link to={`${EditLinkToArtist(artist.link)}`} key={index}>
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
                        <Link to={`${EditLinkToArtist(artist.link)}`} key={index}>
                          <span>
                            {artist.name}{' '}
                            {index !== 0 && index < item?.artists.length - 1 ? `,` : null}
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
      </div>
    </div>
  );
}

export default Reccent;
