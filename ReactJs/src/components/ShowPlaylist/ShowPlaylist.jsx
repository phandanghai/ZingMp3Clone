import { useEffect, useRef, useState } from 'react';
import style from './ShowPlaylist.module.scss';
import clsx from 'clsx';
import { CiHeart } from 'react-icons/ci';
import { CgMoreAlt } from 'react-icons/cg';
import { CiPlay1 } from 'react-icons/ci';
import { IoMicOutline, IoAdd } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setMusicPopup, setPlayList, setSong } from '../../redux/musicSlider';
import { Link } from 'react-router-dom';
import { FiMusic } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { ApiGetPlayList, ApiGetSongInfo } from '../../redux/ApiMusic';
import { setIsPlaying } from '../../redux/stateSlider';
import {
  ApiAddAlbumOnRecentMusic,
  ApiAddMusicOnMyFavourites,
  ApiAddMusicOnRecentMusic,
  ApiRemoveMusicOnMyFavourites,
} from '../../redux/ApiAccount';
import {
  ApiAddMusicOnPlaylist,
  ApiGetDetalMyPlayList,
  ApiGetListMusicOnPlaylist,
  ApiGetSuggestions,
} from '../../redux/ApiAccount';
import MusicPopup from '../Modal/MusicModal/MusicPopup';
import { BsFillPlayFill } from 'react-icons/bs';
import { HandleAddMusicOnMyRecent } from '../../AllFunctions/AllFunctions';
function ShowPlaylist(props) {
  const dispatch = useDispatch();
  const MusicPopupRef = useRef();
  const user = useSelector((state) => state.account.account);
  const songs = useSelector((state) => state.music.song);
  const playList = useSelector((state) => state.music.playList);
  const listMusicIds = useSelector((state) => state?.account?.account?.user?.MyPlayList);
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const [listMusic, setListMusic] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isMusicPopup, setIsMusicPopup] = useState({ state: false, idMusic: null });
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const type = window.location.href.split('/')[3];

  const [idPlaylist, setIdPlaylist] = useState(null);
  const padZero = (num) => {
    return (num < 10 ? '0' : '') + num;
  };
  const setTimes = (duration) => {
    const minutes = padZero(Math.floor(duration / 60));
    const seconds = padZero(Math.floor(duration % 60));
    return `${minutes}:${seconds}`;
  };
  useEffect(() => {
    if (props?.playList && window.location.href.split('/')[3] !== 'myplaylist') {
      const data = props?.playList?.map((item) => {
        return {
          ...item,
          time: setTimes(item.duration),
        };
      });
      setListMusic(data);
    }
  }, [props, window]);

  useEffect(() => {
    ApiGetListMusicOnPlaylist({
      id: window.location.href.split('/')[5].slice(0, -5),
    }).then((data) => {
      console.log(data.myPlayList._doc.name);
      ApiGetSuggestions({ data: data.myPlayList._doc.name }).then((data) => {
        console.log(data);
        setSuggestions(data.data.songs);
        const list = data?.data?.songs?.map((item) => {
          return {
            ...item,
            time: setTimes(item.duration),
          };
        });
        setSuggestions(list);
      });
      setIdPlaylist(window.location.href.split('/')[5].slice(0, -5));
    });
  }, []);

  const runFunctions = async (id) => {
    try {
      dispatch(setSong({ id: id, state: true }));
      dispatch(setIsPlaying(true));
      const index = playList.data.indexOf(id);
      if (index !== -1) {
        dispatch(setPlayList({ id: playList.id, index: index, data: playList.data }));
      } else {
        dispatch(setPlayList({ id: null, index: null, data: [] }));
      }
      if (user) {
        await HandleAddMusicOnMyRecent(dispatch, user, id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      window.location.href.split('/')[3] === 'myplaylist' &&
      props?.playList?.listIdMusics
    ) {
      ApiGetListMusicOnPlaylist({
        id: window.location.href.split('/')[5].slice(0, -5),
      }).then((result) => {
        const data = result?.myPlayList?.listDetalMusic?.map((music) => {
          return {
            ...music,
            time: setTimes(music.duration),
          };
        });
        setListMusic(data);
      });
    }
  }, [props]);

  // console.log(props);

  const AddMusicOnPlaylist = (encodeId) => {
    const id = window.location.href.split('/')[5].slice(0, -5);
    ApiGetDetalMyPlayList({ id: id }).then((data) => {
      if (!data.myPlayList.listIdMusics.includes(encodeId)) {
        ApiAddMusicOnPlaylist({
          id: id,
          myPlaylist: [...data.myPlayList.listIdMusics, encodeId],
        }).then((result) => {
          if (result) {
            ApiGetListMusicOnPlaylist({
              id: window.location.href.split('/')[5].slice(0, -5),
            }).then((result) => {
              console.log(result);
              const data = result.myPlayList.listDetalMusic?.map((music) => {
                return {
                  ...music,
                  time: setTimes(music.duration),
                };
              });

              setListMusic(data);
            });
          }
        });

        toast.success('Thêm bài hát thành công!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        ApiGetListMusicOnPlaylist({
          id: window.location.href.split('/')[5].slice(0, -5),
        });
      } else {
        toast.warning('Bài hát đã tồn tại trong playlist', {
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
    });
  };

  useEffect(() => {
    const HandleClickOutSide = (e) => {
      if (MusicPopupRef.current && !MusicPopupRef.current.contains(e.target)) {
        dispatch(setMusicPopup({ state: false, id: null, type: null }));
      }
    };
    window.addEventListener('mousedown', HandleClickOutSide);
    return () => {
      window.removeEventListener('mousedown', HandleClickOutSide);
    };
  }, [MusicPopupRef]);

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ state: false, id: null, type: null }));
  };

  const EditTitleForMusic = (inputValue) => {
    if (inputValue?.split(' ').length > 4) {
      return `${inputValue.split(' ').slice(0, 4).join(' ')}...`;
    } else {
      return inputValue;
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
  const HandleEditArtistLink = (link) => {
    if (link.substring(0, 8) === '/nghe-si') {
      return `${link}`;
    } else {
      return `/nghe-si${link}`;
    }
  };

  return (
    <div className={style['ShowPlayList']}>
      <ToastContainer />

      {props.playList?.listIdMusics?.length === 0 && (
        <div
          style={{
            backgroundColor: '#ffffff1a',
            width: '100%',
            height: 230,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3 style={{ color: '#ffffff80' }}>Không có bài hát trong playlist của bạn</h3>
        </div>
      )}
      {listMusic?.length > 0 && (
        <div className={style['header']}>
          <h4 className={style['name']}>BÀI HÁT</h4>
          <h4 className={style['album']}>ALBUM</h4>
          <h4 className={style['time']}>THỜI GIAN</h4>
        </div>
      )}

      <div className={style['listMusic']}>
        {listMusic?.map((music, index) => {
          return (
            <div
              key={index}
              className={style['item']}
              style={
                songs.id === music.encodeId ? { backgroundColor: '#ffffff33' } : null
              }
            >
              <FiMusic className={style['music-icon']} />
              <img src={music?.thumbnail} alt="" />

              <div className={style['sort']}>
                <Link to={`${music.link}`} className={style['name']}>
                  {EditTitleForMusic(music?.title)}
                </Link>
                <div className={style['artists']}>
                  {music?.artists?.slice(0, 3)?.map((artist, index) => {
                    return (
                      <Link
                        to={`${HandleEditArtistLink(artist.link)}`}
                        key={index}
                        className={style['artist']}
                      >
                        <p>{artist.name}</p>
                        {index < music.artists.length && index !== 0 && <span>,</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <Link to={`${music?.album?.link}`}>
                <p
                  className={style['title']}
                  onClick={() => props.HandleSetCurrentPlaylist(music?.album?.link)}
                >
                  {music?.album?.title.length > 20
                    ? `${music?.album?.title.substring(0, 20)} ...`
                    : music?.album?.title}
                </p>
              </Link>
              <p className={style['time']}>{music?.time}</p>
              {musicPopup?.state &&
                musicPopup.type === 'playlist' &&
                musicPopup?.id === music.encodeId && (
                  <div className={style['musicPopup']} ref={MusicPopupRef}>
                    <MusicPopup
                      onModal={false}
                      music={music}
                      HandleClosePopup={HandleClosePopup}
                      idPlaylist={idPlaylist}
                    />
                  </div>
                )}
              <div
                className={style['image']}
                style={songs.id === music.encodeId ? { display: 'block' } : null}
              >
                {songs.id === music.encodeId && isPlaying ? (
                  <i
                    className={clsx(style.playingGif)}
                    onClick={() => dispatch(setIsPlaying(false))}
                  />
                ) : (
                  <BsFillPlayFill
                    className={style['icon']}
                    onClick={() => {
                      if (songs.id === music.encodeId) {
                        dispatch(setIsPlaying(true));
                      } else {
                        runFunctions(listMusic[index].encodeId);
                      }
                    }}
                  />
                )}
              </div>
              <div className={style['option']}>
                <div className={style['love']}>
                  {!user?.MyFavourites?.listMusic.includes(music.encodeId) ? (
                    <CiHeart
                      className={style['icon']}
                      onClick={() => HandleAddMusicOnMyFavourites(music?.encodeId)}
                    />
                  ) : (
                    <FaHeart
                      className={clsx(style['icon'], style.active)}
                      onClick={() => HandleRemoveMusicOnMyFavourites(music?.encodeId)}
                    />
                  )}
                </div>
                <div className={style['lyrics']}>
                  <IoMicOutline />
                </div>{' '}
                <div
                  className={style['more']}
                  onClick={() =>
                    dispatch(
                      setMusicPopup({
                        state: true,
                        id: music.encodeId,
                        type: 'playlist',
                      }),
                    )
                  }
                >
                  <CgMoreAlt />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {type === 'myplaylist' && (
        <div className={style['suggestions']}>
          <h2>Bài Hát Gợi Ý</h2>
          <p>Dựa trên tiêu đề của playlist này</p>
          <div className={style['listMusics']}>
            {suggestions?.map((music, index) => {
              return (
                <div key={index} className={style['item']}>
                  <FiMusic className={style['music-icon']} />
                  <img src={music?.thumbnail} alt="" />
                  <div className={style['sort']}>
                    {music.title.length > 30 ? (
                      <h4 className={style['name']}>{`${music?.title?.substring(
                        0,
                        30,
                      )} ...`}</h4>
                    ) : (
                      <h4 className={style['name']}>{music?.title}</h4>
                    )}
                    <div className={style['artists']}>
                      {music?.artists?.map((artist, index) => {
                        return (
                          <Link
                            to={`${HandleEditArtistLink(artist.link)}`}
                            key={index}
                            className={style['artist']}
                          >
                            <p>{artist.name}</p>
                            {index < music.artists.length && index !== 0 && (
                              <span>,</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <Link to={`/bai-hat/${music.alias}/${music.encodeId}.html`}>
                    {music?.album?.title.length > 30 ? (
                      <p className={style['title']}>{`${music?.album?.title.substring(
                        0,
                        30,
                      )} ...`}</p>
                    ) : (
                      <p className={style['title']}>{music?.album?.title}</p>
                    )}
                  </Link>
                  <p className={style['time']}>{music?.time}</p>
                  <div className={style['option']}>
                    <div className={style['image']}>
                      <CiPlay1 className={style['icon']} />
                    </div>
                    <div className={style['love']}>
                      <CiHeart />
                    </div>{' '}
                    <div
                      className={style['add']}
                      onClick={() => AddMusicOnPlaylist(music.encodeId)}
                    >
                      <IoAdd />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowPlaylist;
