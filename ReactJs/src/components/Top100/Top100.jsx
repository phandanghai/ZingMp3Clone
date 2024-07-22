import clsx from 'clsx';
import style from './Top100.module.scss';
import Top from '../../../public/top100.svg';
import { useEffect, useRef, useState } from 'react';
import {
  setIsNewPlayListPopup,
  setIsPlayListPopup,
  setIsPlaying,
} from '../../redux/stateSlider';
import { HandleEditArtistLink } from '../../AllFunctions/AllFunctions';
import { ApiGetHome, ApiGetPlayList, ApiGetTop100 } from '../../redux/ApiMusic';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { BiPlayCircle } from 'react-icons/bi';
import { CgMoreAlt } from 'react-icons/cg';
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CiPlay1 } from 'react-icons/ci';
import { FiDownload } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { TbShare3 } from 'react-icons/tb';
import PlaylistPopup from '../Modal/PlayListPopup/PlaylistPopup';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayList, setSong } from '../../redux/musicSlider';
import {
  HandlePlayingMusicOnPlaylist,
  HandleAddPlaylistOnMyRecent,
} from '../../AllFunctions/AllFunctions';
import {
  ApiAddAlbumOnMyFavourites,
  ApiAddAlbumOnRecentMusic,
} from '../../redux/ApiAccount';
import { HandleEditTitleForMusic } from '../../AllFunctions/AllFunctions';
import { toast } from 'react-toastify';
function Top100() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.account);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const playList = useSelector((state) => state.music.playList);
  const PopupRef = useRef();
  const [outStandings, setOutStandings] = useState([]);
  const [VietMusic, setVietMusic] = useState([]);
  const [AsianMusic, setAsianMusic] = useState([]);
  const [USMusic, setUSMusic] = useState([]);
  const [Symphony, setSymphony] = useState([]);
  const [isPopup, setIsPopup] = useState({ id: null, state: false });
  const isPlayListPopup = useSelector((state) => state.state.isPlayListPopup);
  const DataPopup = [
    {
      title: 'Thêm vào danh sách phát',
      icon: CiPlay1,
    },
    {
      title: 'Tải xuống',
      icon: FiDownload,
    },
    {
      title: 'Sao chép link',
      icon: IoIosLink,
    },
    {
      title: 'Chia sẻ',
      icon: TbShare3,
    },
  ];

  const runFunctions = async (id, index) => {
    console.log(index);
    try {
      await HandlePlayingMusicOnPlaylist(dispatch, id, index);
      if (user) {
        await HandleAddPlaylistOnMyRecent(dispatch, user, id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ApiGetTop100().then((data) => {
      data.data.map((item) => {
        if (item.title === 'Nổi bật') {
          setOutStandings(item.items.splice(0, 5));
        }
        if (item.title === 'Nhạc Châu Á') {
          setAsianMusic(item.items);
        }
        if (item.title === 'Nhạc Việt Nam') {
          setVietMusic(item.items);
        }
        if (item.title === 'Nhạc Âu Mỹ') {
          setUSMusic(item.items);
        }
        if (item.title === 'Nhạc Hòa Tấu') {
          setSymphony(item.items);
        }
      });
    });
  }, []);

  const HandleAddAlbumOnMyFavourites = (id) => {
    if (user) {
      ApiAddAlbumOnMyFavourites(dispatch, {
        id: localStorage.getItem('id'),
        data: [...user?.MyFavourites?.listAlbum, id],
      });
    } else {
      toast.warning('Vui lòng đăng nhập !!!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
      toast.warning('Vui lòng đăng nhập!!!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const HandleClosePlaylistPopup = () => {
    dispatch(setIsPlayListPopup({ id: null, state: false }));
  };

  useEffect(() => {
    const HandleCheckOut = (e) => {
      if (PopupRef.current && !PopupRef.current.contains(e.target)) {
        dispatch(setIsPlayListPopup({ id: null, state: false }));
      }
    };
    window.addEventListener('mousedown', HandleCheckOut);
    return () => {
      window.removeEventListener('mousedown', HandleCheckOut);
    };
  }, [PopupRef]);
  return (
    <div className={style['Top100']}>
      <div className={style['thumbnail']}>
        <img src={Top} alt="" />
      </div>
      <div className={style['outstanding']}>
        <h2>Nổi Bật</h2>
        <div className={style['listBox']}>
          {outStandings.map((item, index) => {
            return (
              <div key={index} className={style['item']}>
                {isPlayListPopup.state && isPlayListPopup.id === item.encodeId && (
                  <div className={style['popup']} ref={PopupRef}>
                    <PlaylistPopup
                      item={item}
                      HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                    />
                  </div>
                )}
                <div
                  className={style['option']}
                  to={item.link}
                  style={
                    item.encodeId === playList.id
                      ? { display: 'flex', color: '#fff' }
                      : { color: '#fff' }
                  }
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
                      dispatch(setIsPlayListPopup({ id: item.encodeId, state: true }));
                    }}
                  />
                </div>
                <div className={style['image']}>
                  <img src={item?.thumbnailM} alt="" />
                </div>
                <h4>{`${HandleEditTitleForMusic(item?.title, 22, 4)}`}</h4>
                <div className={style['artists']}>
                  {item?.artists.slice(0, 3)?.map((artist, index) => {
                    return (
                      <Link
                        to={`${HandleEditArtistLink(artist.link)}`}
                        key={index}
                        className={style['artist']}
                      >
                        {artist?.name}
                        {index < 2 && <span>,</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className={style['outstanding']}>
          <h2>Nhạc Việt Nam</h2>
          <div className={style['listBox']}>
            {VietMusic.map((item, index) => {
              return (
                <div key={index} className={style['item']}>
                  {isPlayListPopup.state && isPlayListPopup.id === item.encodeId && (
                    <div className={style['popup']} ref={PopupRef}>
                      <PlaylistPopup
                        item={item}
                        HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                      />
                    </div>
                  )}
                  <div
                    className={style['option']}
                    to={item.link}
                    style={
                      item.encodeId === playList.id
                        ? { display: 'flex', color: '#fff' }
                        : { color: '#fff' }
                    }
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
                        dispatch(setIsPlayListPopup({ id: item.encodeId, state: true }));
                      }}
                    />
                  </div>
                  <div className={style['image']}>
                    <img src={item?.thumbnailM} alt="" />
                  </div>
                  <h4>{`${HandleEditTitleForMusic(item?.title, 22, 4)}`}</h4>
                  <div className={style['artists']}>
                    {item?.artists.slice(0, 3)?.map((artist, index) => {
                      return (
                        <Link
                          to={`${HandleEditArtistLink(artist.link)}`}
                          key={index}
                          className={style['artist']}
                        >
                          {artist?.name}
                          {index < 2 && <span>,</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={style['outstanding']}>
            <h2>Nhạc Châu Á</h2>
            <div className={style['listBox']}>
              {AsianMusic.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    {isPlayListPopup.state && isPlayListPopup.id === item.encodeId && (
                      <div className={style['popup']} ref={PopupRef}>
                        <PlaylistPopup
                          item={item}
                          HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                        />
                      </div>
                    )}
                    <div
                      className={style['option']}
                      to={item.link}
                      style={
                        item.encodeId === playList.id
                          ? { display: 'flex', color: '#fff' }
                          : { color: '#fff' }
                      }
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
                          dispatch(
                            setIsPlayListPopup({ id: item.encodeId, state: true }),
                          );
                        }}
                      />
                    </div>
                    <div className={style['image']}>
                      <img src={item?.thumbnailM} alt="" />
                    </div>
                    <h4>{`${HandleEditTitleForMusic(item?.title, 22, 4)}`}</h4>
                    <div className={style['artists']}>
                      {item?.artists.slice(0, 3)?.map((artist, index) => {
                        return (
                          <Link
                            to={`${HandleEditArtistLink(artist.link)}`}
                            key={index}
                            className={style['artist']}
                          >
                            {artist?.name}
                            {index < 2 && <span>,</span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={style['outstanding']}>
            <h2>Nhạc Âu Mỹ</h2>
            <div className={style['listBox']}>
              {USMusic.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    {isPlayListPopup.state && isPlayListPopup.id === item.encodeId && (
                      <div className={style['popup']} ref={PopupRef}>
                        <PlaylistPopup
                          item={item}
                          HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                        />
                      </div>
                    )}
                    <div
                      className={style['option']}
                      to={item.link}
                      style={
                        item.encodeId === playList.id
                          ? { display: 'flex', color: '#fff' }
                          : { color: '#fff' }
                      }
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
                          dispatch(
                            setIsPlayListPopup({ id: item.encodeId, state: true }),
                          );
                        }}
                      />
                    </div>
                    <div className={style['image']}>
                      <img src={item?.thumbnailM} alt="" />
                    </div>
                    <h4>{`${HandleEditTitleForMusic(item?.title, 22, 4)}`}</h4>
                    <div className={style['artists']}>
                      {item?.artists.slice(0, 3)?.map((artist, index) => {
                        return (
                          <Link
                            to={`${HandleEditArtistLink(artist.link)}`}
                            key={index}
                            className={style['artist']}
                          >
                            {artist?.name}
                            {index < 2 && <span>,</span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={style['outstanding end']}>
            <h2>Nhạc Hòa Tấu</h2>
            <div className={style['listBox']}>
              {Symphony.map((item, index) => {
                return (
                  <div key={index} className={style['item']}>
                    {isPlayListPopup.state && isPlayListPopup.id === item.encodeId && (
                      <div className={style['popup']} ref={PopupRef}>
                        <PlaylistPopup
                          item={item}
                          HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                        />
                      </div>
                    )}
                    <div
                      className={style['option']}
                      to={item.link}
                      style={
                        item.encodeId === playList.id
                          ? { display: 'flex', color: '#fff' }
                          : { color: '#fff' }
                      }
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
                          dispatch(
                            setIsPlayListPopup({ id: item.encodeId, state: true }),
                          );
                        }}
                      />
                    </div>
                    <div className={style['image']}>
                      <img src={item?.thumbnailM} alt="" />
                    </div>
                    <h4>{`${HandleEditTitleForMusic(item?.title, 22, 4)}`}</h4>
                    <div className={style['artists']}>
                      {item?.artists.slice(0, 3)?.map((artist, index) => {
                        return (
                          <Link
                            to={`${HandleEditArtistLink(artist.link)}`}
                            key={index}
                            className={style['artist']}
                          >
                            {artist?.name}
                            {index < 2 && <span>,</span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top100;
