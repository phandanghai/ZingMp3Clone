import { useEffect, useRef, useState } from 'react';
import style from './ListSongOfArtist.module.scss';
import clsx from 'clsx';
import { PiMicrophoneStageDuotone } from 'react-icons/pi';
import { CiHeart } from 'react-icons/ci';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { CgMoreAlt } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { ApiGetPlayList } from '../../../redux/ApiMusic';
import { setPlayList, setSong } from '../../../redux/musicSlider';
import { ApiAddAlbumOnMyFavourites } from '../../../redux/ApiAccount';
import {
  ApiRemoveMusicOnMyFavourites,
  ApiAddMusicOnMyFavourites,
  ApiAddMusicOnRecentMusic,
} from '../../../redux/ApiAccount';
import { setMusicPopup } from '../../../redux/musicSlider';
import MusicPopup from '../../Modal/MusicModal/MusicPopup';
import PlaylistPopup from '../../Modal/PlayListPopup/PlaylistPopup';
import { setIsPlaying } from '../../../redux/stateSlider';
import {
  HandleAddMusicOnMyRecent,
  HandleAddPlaylistOnMyRecent,
  HandlePlayingMusicOnPlaylist,
} from '../../../AllFunctions/AllFunctions';
import { ToastContainer, toast } from 'react-toastify';
function ListSongOfArtist(props) {
  const dispatch = useDispatch();
  const MusicPopupRef = useRef();
  const PopupRef = useRef();
  const [featuredSong, setFeaturedSong] = useState([]);
  const [single, setSingle] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [MVs, setMVs] = useState([]);
  const [collection, setCollection] = useState([]);
  const [biography, setBiography] = useState([]);
  const [appearance, setAppearance] = useState([]);
  const [liked, setLiked] = useState([]);
  const [resize, setResize] = useState({
    width: null,
    height: null,
  });
  const [isMusicPopup, setIsMusicPopup] = useState({ state: false, idMusic: null });
  const [isPopup, setIsPopup] = useState({ id: null, state: false });
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const user = useSelector((state) => state.account.account);
  const songs = useSelector((state) => state.music.song);
  const playList = useSelector((state) => state.music.playList);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  useEffect(() => {
    const padZero = (num) => {
      return (num < 10 ? '0' : '') + num;
    };
    const setTimes = (duration) => {
      const minutes = padZero(Math.floor(duration / 60));
      const seconds = padZero(Math.floor(duration % 60));
      return `${minutes}:${seconds}`;
    };
    if (props.detal.sections) {
      const data = props.detal.sections[0].items.map((item) => {
        return {
          ...item,
          time: padZero(setTimes(item.duration)),
        };
      });

      setFeaturedSong(data);

      props.detal.sections.map((item) => {
        if (item.title === 'Single & EP') {
          setSingle(item?.items);
        }
        if (item.title === 'Album') {
          setAlbums(item?.items);
        }
        if (item.title === 'MV') {
          setMVs(item?.items);
        }
        if (item.title === 'Tuyển tập') {
          setCollection(item?.items);
        }
        if (item.title === 'Xuất hiện trong') {
          setAppearance(item?.items);
        }
        if (item.title === 'Bạn Có Thể Thích') {
          setLiked(item?.items);
        }
      });

      const bio = props.detal.biography.split('<br>');
      setBiography(bio);
    }
  }, [props.detal]);

  const runFunctions = async (id) => {
    try {
      dispatch(setSong({ id: id, state: true }));
      dispatch(setIsPlaying(true));
      dispatch(setPlayList({ id: null, data: [], indexx: null }));
      if (user) {
        await HandleAddMusicOnMyRecent(dispatch, user, id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleAddPlaylist = async (id, index) => {
    try {
      await HandlePlayingMusicOnPlaylist(dispatch, id, index);
      if (user) {
        await HandleAddPlaylistOnMyRecent(dispatch, user, id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleAddMusicOnMyFavourites = (id) => {
    if (user) {
      ApiAddMusicOnMyFavourites(dispatch, {
        id: localStorage.getItem('id'),
        data: [...user?.MyFavourites?.listMusic, id],
      });
    } else {
      toast.warning('Vui lòng đăng nhập', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const HandleRemoveMusicOnMyFavourites = (id) => {
    if (user) {
      ApiAddMusicOnMyFavourites(dispatch, {
        id: localStorage.getItem('id'),
        data: user?.MyFavourites?.listMusic?.filter((num) => num !== id),
      });
    } else {
      toast.warning('Vui lòng đăng nhập', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  const EditTitleForMusic = (inputValue) => {
    if (inputValue?.split(' ').length > 3) {
      return `${inputValue.split(' ').slice(0, 3).join(' ')}...`;
    } else {
      return inputValue;
    }
  };

  useEffect(() => {
    const HandleResize = () => {
      setResize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', HandleResize);
    return () => {
      window.removeEventListener('resize', HandleResize);
    };
  }, [window]);

  useEffect(() => {
    setResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  console.log(single);
  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ state: false, id: null, type: null }));
  };

  useEffect(() => {
    const HandleClickOutSide = (e) => {
      if (MusicPopupRef.current && !MusicPopupRef.current.contains(e.target)) {
        dispatch(setMusicPopup({ state: false, id: null, type: null }));
      }
      if (PopupRef.current && !PopupRef.current.contains(e.target)) {
        setIsPopup({ id: null, state: false });
      }
    };
    window.addEventListener('mousedown', HandleClickOutSide);
    return () => {
      window.removeEventListener('mousedown', HandleClickOutSide);
    };
  }, [MusicPopupRef, PopupRef]);
  const HandleClosePlaylistPopup = () => {
    setIsPopup({ id: null, state: false });
  };

  const HandleAddAlbumOnMyFavourites = (id) => {
    if (user) {
      ApiAddAlbumOnMyFavourites(dispatch, {
        id: localStorage.getItem('id'),
        data: [...user?.MyFavourites?.listAlbum, id],
      });
    } else {
      toast.warning('Vui lòng đăng nhập', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const HandleRemoveAlbumOnMyFavourites = (id) => {
    if (user) {
      ApiAddAlbumOnMyFavourites(dispatch, {
        id: localStorage.getItem('id'),
        data: user?.MyFavourites?.listAlbum.filter((encodeId) => encodeId !== id),
      });
    } else {
      toast.warning('Vui lòng đăng nhập', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className={style['ListSongOfArtist']}>
      <ToastContainer />
      <div className={style['featuredSong']}>
        <h2>Bài Hát Nổi Bật</h2>
        <div className={style['listFeatured']}>
          {featuredSong.slice(0, 6).map((song, index) => {
            return (
              <div
                key={song.encodeId}
                className={style['item']}
                style={songs.id === song.encodeId ? { background: '#ffffff33' } : null}
              >
                {musicPopup?.state &&
                  musicPopup.type === 'artist' &&
                  musicPopup?.id === song.encodeId && (
                    <div className={style['musicPopup']} ref={MusicPopupRef}>
                      <MusicPopup
                        onModal={true}
                        music={song}
                        HandleClosePopup={HandleClosePopup}
                        // idPlaylist={idPlaylist}
                      />
                    </div>
                  )}
                <img src={song.thumbnail} alt="" />
                <div className={style['descript']}>
                  <Link to={`${song.link}`} className={style['title']}>
                    {resize.width <= 768 ? EditTitleForMusic(song.title) : song.title}
                  </Link>
                  <p className={style['artist']}>{song.artistsNames}</p>
                  <p className={style['time']}>{song.time}</p>
                </div>
                <div
                  className={style['play']}
                  style={songs.id === song.encodeId ? { display: 'block' } : null}
                >
                  {songs.id === song.encodeId && isPlaying ? (
                    <i
                      className={style['playing']}
                      onClick={() => dispatch(setIsPlaying(false))}
                    ></i>
                  ) : (
                    <FaPlay
                      className={style['icon']}
                      onClick={() => {
                        if (songs.id === song.encodeId) {
                          dispatch(setIsPlaying(true));
                        } else {
                          runFunctions(song.encodeId);
                        }
                      }}
                    />
                  )}
                </div>
                <div className={style['option']}>
                  <div className={style['mic']}>
                    <PiMicrophoneStageDuotone className={style['icon']} />
                  </div>
                  {!user?.MyFavourites?.listMusic.includes(song.encodeId) ? (
                    <div className={style['love']}>
                      <CiHeart
                        className={style['icon']}
                        onClick={() => HandleAddMusicOnMyFavourites(song?.encodeId)}
                      />
                    </div>
                  ) : (
                    <div className={style['like']}>
                      <FaHeart
                        className={clsx(style['icon'], style.active)}
                        onClick={() => HandleRemoveMusicOnMyFavourites(song?.encodeId)}
                      />
                    </div>
                  )}
                  <div
                    className={style['more']}
                    onClick={() =>
                      dispatch(
                        setMusicPopup({
                          state: true,
                          id: song.encodeId,
                          type: 'artist',
                        }),
                      )
                    }
                  >
                    <MdOutlineMoreHoriz className={style['icon']} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {single.length !== 0 && (
          <div className={style['SinglePlaylist']}>
            <h2>Single & SP</h2>
            <div className={style['listSingle']}>
              {single.slice(0, 5)?.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    {isPopup.state && isPopup.id === item.encodeId && (
                      <div className={style['popup']} ref={PopupRef}>
                        <PlaylistPopup
                          HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                        />
                      </div>
                    )}
                    <div
                      className={style['option']}
                      to={item.link}
                      style={item.encodeId === playList.id ? { display: 'flex' } : null}
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
                                HandleAddPlaylist(item.encodeId, 0);
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
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <h3>{`${item.title.substring(0, 22)} ...`}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {albums.length !== 0 && (
          <div className={style['AlbumPlaylist']}>
            <h2>Album</h2>
            <div className={style['listAlbum']}>
              {albums.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    <div
                      className={style['option']}
                      to={item.link}
                      style={item.encodeId === playList.id ? { display: 'flex' } : null}
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
                                HandleAddPlaylist(item.encodeId);
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
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <h3>{`${item.title.substring(0, 20)} ...`}</h3>
                    <p>{item?.releaseDateText || item?.releaseDate}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {MVs?.length !== 0 && (
          <div className={style['MVPlaylist']}>
            <h2>MV</h2>
            <div className={style['listMV']}>
              {MVs?.slice(0, 3).map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    <div className={style['image']}>
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <img className={style['artist']} src={props.detal.thumbnail} alt="" />
                    <h3>{item.title}</h3>
                    <p>{item.artistsNames}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {collection.length !== 0 && (
          <div className={style['listCollection']}>
            <h2>Tuyển tập</h2>
            <div className={style['collections']}>
              {collection.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    {isPopup.state && isPopup.id === item.encodeId && (
                      <div className={style['popup']} ref={PopupRef}>
                        <PlaylistPopup
                          HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                        />
                      </div>
                    )}
                    <div
                      className={style['option']}
                      to={item.link}
                      style={item.encodeId === playList.id ? { display: 'flex' } : null}
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
                                HandleAddPlaylist(item.encodeId);
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
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <h4>{`${item.title.substring(0, 23)} ...`}</h4>
                    <p>{props.detal.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {appearance.length !== 0 && (
          <div className={style['listCollection']}>
            <h2>Xuất hiện trong</h2>
            <div className={style['collections']}>
              {appearance.slice(0, 5)?.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    {isPopup.state && isPopup.id === item.encodeId && (
                      <div className={style['popup']} ref={PopupRef}>
                        <PlaylistPopup
                          HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                        />
                      </div>
                    )}
                    <div
                      className={style['option']}
                      to={item.link}
                      style={item.encodeId === playList.id ? { display: 'flex' } : null}
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
                                HandleAddPlaylist(item.encodeId);
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
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <h4>{`${item.title.substring(0, 23)} ...`}</h4>
                    <p>{props.detal.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {liked.length !== 0 && (
          <div className={style['MayBeLike']}>
            <h2>Có thể bạn thích</h2>
            <div className={style['liked']}>
              {liked.slice(0, 5)?.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    <img src={item.thumbnail} alt="" />
                    <h4>{item.name}</h4>
                    <p>{`${Math.floor(item.totalFollow / 1000)}k quan tâm`}</p>
                    <button>
                      <h4>Quan tâm</h4>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {biography.length > 1 && (
          <div className={style['ArtistInfo']}>
            <h2>{`Về ${props.detal.name}`}</h2>
            <div className={style['info']}>
              <img src={props.detal.thumbnail} alt="" />
              <div className={style['biography']}>
                {biography[0]?.trim().length > 165 ? (
                  <p>{biography[0]?.slice(0, 165)}</p>
                ) : (
                  <p>{biography[0]}</p>
                )}
                <h5>Xem thêm</h5>
              </div>
              <h3>
                {`${Math.floor(props.detal.follow / 1000)}.${
                  Math.floor(props.detal.follow) % 1000
                }`}
                <p> người quan tâm</p>
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListSongOfArtist;
