import style from './ListMusicModal.module.scss';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdOutlineFileDownload, MdPlaylistAdd } from 'react-icons/md';
import { IoIosAddCircleOutline, IoIosMore } from 'react-icons/io';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { CiHeart, CiPlay1 } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { HandleAddMusicOnMyRecent } from '../../../AllFunctions/AllFunctions';
import { ApiGetListMusicInfo, ApiSearchMusic } from '../../../redux/ApiMusic';
import { Link } from 'react-router-dom';
import MusicPopup from '../MusicModal/MusicPopup';
import { setMusicPopup, setListMusicModal } from '../../../redux/musicSlider';
import { ApiGetPlayList } from '../../../redux/ApiMusic';
import { setPlayList, setSong } from '../../../redux/musicSlider';
import { setIsLogin, setIsPlaying } from '../../../redux/stateSlider';
import {
  ApiAddMusicOnMyFavourites,
  ApiRemoveMusicOnMyFavourites,
} from '../../../redux/ApiAccount';
import Slider from 'react-slick';
function ListMusicModal(props) {
  const dispatch = useDispatch();
  const BoxRef = useRef();
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const playlist = useSelector((state) => state.music.playList);
  const songs = useSelector((state) => state.music.song);
  const user = useSelector((state) => state.account.account);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const MenuRef = useRef();
  const musicRef = useRef();
  const Menus = [
    {
      title: 'Xóa danh sách phát',
      icon: FaRegTrashCan,
    },
    {
      title: 'Tải danh sách phát',
      icon: MdOutlineFileDownload,
    },
    {
      title: 'Thêm vào playlist',
      icon: IoIosAddCircleOutline,
    },
  ];
  const [active, setActive] = useState('Danh sách phát');
  const [isMenu, setIsMenu] = useState(false);
  const [listMusic, setListMusic] = useState([]);
  const [listSuggest, setListSuggest] = useState([]);
  const listMusicRef = useRef();
  const [currentTop, setCurrentTop] = useState(0);
  const [activeMusic, setActiveMusic] = useState({});
  const [isMore, setIsMore] = useState({ id: null, state: false });
  const [idPlaylist, setIdPlaylist] = useState(null);
  const playList = useSelector((state) => state.music.playList);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (MenuRef.current && !MenuRef.current.contains(event.target)) {
        setIsMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [MenuRef]);

  useEffect(() => {
    if (playlist.id) {
      ApiGetListMusicInfo(playlist.data).then((data) => {
        setListMusic(data);
      });
    } else {
      setListMusic([]);
    }
    if (songs.id) {
      ApiGetListMusicInfo([songs.id]).then((data) => {
        setActiveMusic(data[0]);
      });
    }

    if (playList.id === null || playList.id === 'customUser') {
      ApiGetListMusicInfo([songs.id]).then((data) => {
        ApiSearchMusic({ data: data[0]?.title }).then((result) => {
          if (result?.data?.songs) {
            const data = result?.data?.songs?.filter(
              (item) => item.encodeId !== songs.id,
            );
            const newData = data.filter(
              (item) => !playlist?.data.includes(item.encodeId),
            );
            setListSuggest(newData);
          }
        });
      });
    }
  }, [playlist, songs]);

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

  const EditTitleForMusic = (inputValue) => {
    if (inputValue?.split(' ').length > 4) {
      return `${inputValue.split(' ').slice(0, 4).join(' ')} ...`;
    } else {
      return inputValue;
    }
  };

  const setLink = (link) => {
    if (link.substring(0, 8) === '/nghe-si') {
      return link;
    } else {
      return `/nghe-si${link}`;
    }
  };

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ id: null, state: false, type: null }));
  };

  const musicPopupRef = useRef();
  useEffect(() => {
    const HandleClickOutSide = () => {
      if (musicPopupRef.current && !musicPopupRef.current.contains(event.target)) {
        dispatch(setMusicPopup({ id: null, state: false, type: null }));
      }
    };
    window.addEventListener('mousedown', HandleClickOutSide);
    return () => {
      window.removeEventListener('mousedown', HandleClickOutSide);
    };
  }, [musicPopupRef]);

  const HandleAddMusicOnMyFavourites = (id) => {
    if (user) {
      ApiAddMusicOnMyFavourites(dispatch, {
        id: localStorage.getItem('id'),
        data: [...user?.MyFavourites?.listMusic, id],
      });
    } else {
      props.HandleRequestLogin();
    }
  };

  const HandleRemoveMusicOnMyFavourites = (id) => {
    if (user) {
      ApiAddMusicOnMyFavourites(dispatch, {
        id: localStorage.getItem('id'),
        data: user?.MyFavourites?.listMusic.filter((encodeId) => encodeId !== id),
      });
    } else {
      props.HandleRequestLogin();
    }
  };

  const HandleClickAction = (title) => {
    console.log(title);
    if (title === 'Xóa danh sách phát') {
      dispatch(setListMusicModal(false));
      dispatch(
        setPlayList({
          id: null,
          data: [],
          index: null,
        }),
      );
      dispatch(setSong({ id: null, state: false }));
    }
  };

  const HandleCustomplaylist = (id) => {
    console.log(id);
    if (playlist.data.length === 0) {
      dispatch(setPlayList({ id: 'customUser', data: [songs.id, id], index: 0 }));
    } else {
      console.log('thêm vào customUser');
      dispatch(
        setPlayList({
          id: 'customUser',
          data: [...playlist.data, id],
          index: playlist.index,
        }),
      );
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    vertical: true,
    verticalSwiping: true,
    touchMove: false,
  };

  useEffect(() => {
    if (playlist.data.length > 0) {
    }
  }, [songs, playlist]);
  return (
    <div className={style['ListMusicModal']}>
      <header>
        <div className={style['box']}>
          {['Danh sách phát', 'Nghe gần đây'].map((title) => {
            return (
              <div
                className={style['item']}
                key={title}
                onClick={() => setActive(title)}
                style={
                  active === title
                    ? {
                        backgroundColor: 'rgba(255, 255, 255, 0.2) ',
                      }
                    : null
                }
              >
                <h4 style={active === title ? { color: '#fff' } : null}>{title}</h4>
              </div>
            );
          })}
        </div>
        <div className={style['more']} onClick={() => setIsMenu(!isMenu)}>
          <IoIosMore className={style['icon']} />
        </div>

        {isMenu && (
          <div className={style['popup']} ref={MenuRef}>
            <div className={style['before']} onClick={() => setIsMenu(false)}></div>
            {Menus.map((menu) => {
              const Icon = menu.icon;
              return (
                <div
                  className={style['item']}
                  key={menu.title}
                  onClick={() => HandleClickAction(menu.title)}
                >
                  <Icon className={style['icon']} />
                  <h4>{menu.title}</h4>
                </div>
              );
            })}
          </div>
        )}
      </header>

      <main>
        {songs.id && playlist.data.length === 0 && (
          <div className={style['activeMusic']}>
            <h2>Bài đang phát</h2>
            <div className={clsx(style['item'], style['active'])}>
              <img src={activeMusic?.thumbnailM} alt="" />
              <div className={style['info']}>
                <h4 className={style['title']}>
                  {EditTitleForMusic(activeMusic?.title)}
                </h4>

                <div className={style['listArtist']}>
                  {activeMusic?.artists?.map((artist, index) => {
                    return (
                      <div key={index}>
                        <Link to={`/nghe-si${artist.link}`}>{artist?.name}</Link>
                        {index !== 0 && index < activeMusic?.artists?.length && (
                          <span>,</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {active === 'Danh sách phát' && playlist.data.length !== 0 && (
          <div
            style={{
              width: '100%',
            }}
          >
            <div
              className={style['listMusic']}
              style={{
                position: 'relative',
              }}
              ref={listMusicRef}
            >
              {listMusic.length > 0 && (
                // <Slider
                //   {...settings}
                //   style={{ width: '100%', height: '100%' }}
                //   ref={BoxRef}
                // >
                <div>
                  {listMusic.map((music, index) => {
                    return (
                      <div
                        className={
                          songs.id === music.encodeId
                            ? clsx(style['item'], style['active'])
                            : style['item']
                        }
                        key={index}
                      >
                        <div>
                          {songs.id === music.encodeId && isPlaying ? (
                            <i
                              className={style['playing']}
                              style={
                                songs.id === music.encodeId && isPlaying
                                  ? { dispatch: 'block' }
                                  : null
                              }
                              onClick={() => dispatch(setIsPlaying(false))}
                            ></i>
                          ) : (
                            <BsFillPlayFill
                              className={style['play']}
                              onClick={() => {
                                if (songs.id === music.encodeId) {
                                  dispatch(setIsPlaying(true));
                                } else {
                                  runFunctions(music.encodeId);
                                }
                              }}
                            />
                          )}
                        </div>

                        {user?.MyFavourites?.listMusic?.includes(music?.encodeId) ? (
                          <div
                            className={style['love']}
                            style={
                              songs.id === music.encodeId ? { display: 'block' } : null
                            }
                            onClick={() =>
                              HandleRemoveMusicOnMyFavourites(music?.encodeId)
                            }
                          >
                            <FaHeart
                              style={
                                music.encodeId === songs.id
                                  ? { WebkitFilter: 'invert(0%)' }
                                  : null
                              }
                              className={clsx(style['icon'], style['activePlay'])}
                            />
                          </div>
                        ) : (
                          <div
                            className={style['love']}
                            style={
                              songs.id === music.encodeId ? { display: 'block' } : null
                            }
                            onClick={() => HandleAddMusicOnMyFavourites(music?.encodeId)}
                          >
                            <CiHeart
                              style={
                                music.encodeId === songs.id
                                  ? { WebkitFilter: 'invert(0%)' }
                                  : null
                              }
                              className={style['icon']}
                            />
                          </div>
                        )}
                        <div
                          className={style['more']}
                          style={
                            songs.id === music.encodeId ? { display: 'block' } : null
                          }
                          onClick={() =>
                            dispatch(
                              setMusicPopup({
                                id: music.encodeId,
                                state: true,
                                type: 'modal',
                              }),
                            )
                          }
                        >
                          <IoIosMore
                            className={style['icon']}
                            style={
                              music.encodeId === songs.id
                                ? { WebkitFilter: 'invert(0%)' }
                                : null
                            }
                          />
                        </div>

                        {musicPopup?.state &&
                          musicPopup.type === 'modal' &&
                          musicPopup?.id === music.encodeId && (
                            <div className={style['moreModal']} ref={musicPopupRef}>
                              <MusicPopup
                                HandleClosePopup={HandleClosePopup}
                                onModal={true}
                                music={music}
                                idPlaylist={idPlaylist}
                              />
                            </div>
                          )}
                        <img src={music?.thumbnailM} alt="" />
                        <div className={style['info']}>
                          <Link
                            className={style['title']}
                            to={music?.link}
                            style={
                              index < playlist.index
                                ? { color: '#78727a' }
                                : index === playlist.index
                                ? { color: '#fff' }
                                : index > playlist.index
                                ? {}
                                : null
                            }
                          >
                            {EditTitleForMusic(music?.title)}
                          </Link>
                          <div className={style['listArtist']}>
                            {music?.artists?.map((artist, number) => {
                              return (
                                <div key={number}>
                                  <Link
                                    to={setLink(artist.link)}
                                    className={style['artist']}
                                    style={
                                      index < playlist.index
                                        ? { color: '#78727a' }
                                        : index === playlist.index
                                        ? { color: '#fff' }
                                        : index > playlist.index
                                        ? {}
                                        : null
                                    }
                                  >
                                    {artist?.name}
                                  </Link>
                                  {index !== 0 && index < music.artists.length && (
                                    <span>,</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                // </Slider>
              )}
              {(playList.id === null || playList.id === 'customUser') && (
                <div>
                  <h2>Danh sách bài hát gợi ý</h2>
                  {listSuggest.map((music, index) => {
                    return (
                      <div className={style['item']} key={index}>
                        <div>
                          {songs.id === music.encodeId && isPlaying ? (
                            <i
                              className={style['playing']}
                              style={
                                songs.id === music.encodeId && isPlaying
                                  ? { dispatch: 'block' }
                                  : null
                              }
                              onClick={() => dispatch(setIsPlaying(false))}
                            ></i>
                          ) : (
                            <BsFillPlayFill
                              className={style['play']}
                              onClick={() => {
                                if (songs.id === music.encodeId) {
                                  dispatch(setIsPlaying(true));
                                } else {
                                  runFunctions(music.encodeId);
                                }
                              }}
                            />
                          )}
                        </div>
                        <div
                          className={style['love']}
                          style={{ display: 'block' }}
                          onClick={() => HandleCustomplaylist(music.encodeId)}
                        >
                          <MdPlaylistAdd className={clsx(style['icon'])} />
                        </div>
                        <div
                          className={
                            music.encodeId === songs.id
                              ? style['more']
                              : clsx(style.more, style.isShow)
                          }
                          onClick={() =>
                            dispatch(
                              setMusicPopup({
                                id: music.encodeId,
                                state: true,
                                type: 'modal',
                              }),
                            )
                          }
                        >
                          <IoIosMore className={style['icon']} />
                        </div>

                        {musicPopup?.state &&
                          musicPopup.type === 'modal' &&
                          musicPopup?.id === music.encodeId && (
                            <div className={style['moreModal']} ref={musicPopupRef}>
                              <MusicPopup
                                HandleClosePopup={HandleClosePopup}
                                onModal={true}
                                music={music}
                                idPlaylist={idPlaylist}
                              />
                            </div>
                          )}
                        <img src={music?.thumbnailM} alt="" />
                        <div className={style['info']}>
                          <Link className={style['title']} to={music?.link}>
                            {EditTitleForMusic(music?.title)}
                          </Link>
                          <div className={style['listArtist']}>
                            {music?.artists?.map((artist, number) => {
                              return (
                                <div key={number}>
                                  <Link
                                    to={setLink(artist.link)}
                                    className={style['artist']}
                                  >
                                    {artist?.name}
                                  </Link>
                                  {index !== 0 && index < music.artists.length && (
                                    <span>,</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ListMusicModal;
