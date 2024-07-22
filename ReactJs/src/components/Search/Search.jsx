import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import style from './Search.module.scss';
import { ApiSearchMusic } from '../../redux/ApiMusic';
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
  HandleEditArtistLink,
} from '../../AllFunctions/AllFunctions';
import { IoFastFood } from 'react-icons/io5';
function Search() {
  const dispatch = useDispatch();
  const musicPopupRef = useRef();
  const headers = ['Bài hát', 'Playlist/Album', 'Nghệ sĩ', 'MV'];
  const [active, setActive] = useState('Playlist/Album');
  const [listMusic, setListMusic] = useState([]);
  const [listAlbum, setListAlbum] = useState([]);
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const songs = useSelector((state) => state.music.song);
  const playList = useSelector((state) => state.music.playList);
  const user = useSelector((state) => state.account.account);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const padZero = (num) => {
    return (num < 10 ? '0' : '') + num;
  };
  const setTimes = (duration) => {
    const minutes = padZero(Math.floor(duration / 60));
    const seconds = padZero(Math.floor(duration % 60));
    return `${minutes}:${seconds}`;
  };
  useEffect(() => {
    const params = new URL(window.location.href, window.location.origin).searchParams.get(
      'search',
    );
    console.log(params);
    ApiSearchMusic({ data: params }).then((result) => {
      console.log(result.data);
      const musics = result.data.songs.map((item) => {
        return {
          ...item,
          time: setTimes(padZero(item.duration)),
        };
      });
      setListMusic(musics);
      setListAlbum(result.data.playlists);
    });
  }, []);

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ state: false, id: null, type: null }));
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

  const runFunctions = async (id, index) => {
    try {
      await HandlePlayingMusicOnPlaylist(dispatch, id, index);
      if (user) {
        await HandleAddPlaylistOnMyRecent(dispatch, user, id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(listMusic);
  return (
    <div className={style['Search']}>
      <header>
        <h2>Kết Quả Tìm Kiếm</h2>
        <div className={style['head']}>
          {headers.map((header) => {
            return (
              <div
                className={style['btn']}
                key={header}
                onClick={() => setActive(header)}
                style={active === header ? { borderBottom: '3px solid #9b4de0' } : null}
              >
                <h3>{header}</h3>
              </div>
            );
          })}
        </div>
      </header>
      <main>
        {active === 'Bài hát' && (
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

        {active === 'Playlist/Album' && (
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
                              runFunctions(item.encodeId, 0);
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
                    {item?.artists?.slice(0, 2).map((artist, index) => {
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
        {(active === 'Nghệ sĩ' || active === 'MV') && (
          <div className={style['developing']}>
            <h3>Chức năng đang được phát triển</h3>
          </div>
        )}
      </main>
    </div>
  );
}

export default Search;
