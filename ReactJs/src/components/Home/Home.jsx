import { useEffect, useRef, useState } from 'react';
import style from './Home.module.scss';
import clsx from 'clsx';
import { HandleEditArtistLink } from '../../AllFunctions/AllFunctions';
import { ApiGetHome, ApiGetPlayList } from '../../redux/ApiMusic';
import Slider from 'react-slick';
import { FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { CgMoreAlt } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayList, setSong } from '../../redux/musicSlider';
import { setMusicPopup } from '../../redux/musicSlider';
import { setIsPlayListPopup } from '../../redux/stateSlider';
import {
  ApiAddAlbumOnRecentMusic,
  ApiAddMusicOnRecentMusic,
} from '../../redux/ApiAccount';
import { setIsPlaying, setSized } from '../../redux/stateSlider';
import PlaylistPopup from '../Modal/PlayListPopup/PlaylistPopup';
import { ApiAddAlbumOnMyFavourites } from '../../redux/ApiAccount';
import { FaHeart } from 'react-icons/fa';
import PlayingGif from '../../../public/playing.gif';
import {
  HandleAddPlaylistOnMyRecent,
  HandleEditTitleForMusic,
  HandlePlayingMusicOnPlaylist,
} from '../../AllFunctions/AllFunctions';
import Top100 from '../Top100/Top100';
import { ToastContainer, toast } from 'react-toastify';
import MusicPopup from '../Modal/MusicModal/MusicPopup';

function Home() {
  const dispatch = useDispatch();
  const MusicPopupRef = useRef();
  const PopupRef = useRef();
  const HomeRef = useRef();
  const user = useSelector((state) => state.account.account);
  const songs = useSelector((state) => state.music.song);
  const playList = useSelector((state) => state.music.playList);
  console.log(user?.MyFavourites?.listAlbum?.includes('ZWZB969E'));
  const [isPopup, setIsPopup] = useState({ id: null, state: false });
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const PreviousArrowButton = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255,0.2)',
          padding: 10,
          position: 'absolute',
          top: 80,
          left: 10,
          zIndex: 100,
          padding: 10,
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <FaAngleLeft
          className={style['icon']}
          style={{
            position: 'absolute',
            WebkitFilter: 'invert(0%)',
            width: 30,
            height: 30,
          }}
        />
      </div>
    );
  };

  const NextArrowButton = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255,0.2)',
          padding: 10,
          position: 'absolute',
          top: 80,
          right: 30,
          zIndex: 100,
          padding: 10,
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <FaAngleRight
          className={style['icon']}
          style={{
            position: 'absolute',
            WebkitFilter: 'invert(0%)',
            width: 30,
            height: 30,
          }}
        />
      </div>
    );
  };

  const settings = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: false,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };

  const settingsRadio = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: false,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };

  const settingsBanners = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: false,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };
  const settingsBanner1 = {
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: false,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };
  const [allData, setAllData] = useState(null);
  const [banners, setBanners] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [release, setRelease] = useState([]);
  const [listIdNewRelease, setIdNewRelease] = useState([]);
  const [listRemix, setListRemix] = useState([]);
  const [listIdRemix, setListIdRemix] = useState([]);
  const [listChill, setListChill] = useState([]);
  const [listIdChill, setListIdChill] = useState([]);
  const [moonMusic, setMoonMusic] = useState([]);
  const [listIdMoonMusic, setListIdMoonMusic] = useState([]);
  const [top100, setTop100] = useState([]);
  const [listIdTop100, setListIdTop100] = useState([]);
  const [album, setAlbum] = useState([]);
  const [radio, setRadio] = useState([]);
  const [active, setActive] = useState('Tất cả');
  const [resize, setResize] = useState({
    width: null,
    height: null,
  });

  const musicPopup = useSelector((state) => state.music.musicPopup);
  const isPlayListPopup = useSelector((state) => state.state.isPlayListPopup);
  useEffect(() => {
    ApiGetHome().then((data) => {
      console.log(data.data);
      setAllData(data?.data?.items);
    });
  }, []);

  useEffect(() => {
    HandleEditTitleForMusic('Lại nhớ em rồi (From "Dickson Lofi")Single', 22, 4);
  }, []);

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

  useEffect(() => {
    if (allData) {
      allData.map((item) => {
        if (item.title === '') {
          setBanners(item?.items.splice(0, 3));
        }
        if (item.title === 'Mới phát hành') {
          setRelease(item?.items?.all);
          setNewRelease(item?.items?.all);
        }
        if (item.title === 'Nhạc Remix cực bốc') {
          setListRemix(item?.items);
        }
        if (item.title === 'Chill') {
          setListChill(item?.items);
        }
        if (item.title === 'Tâm trạng tan chậm') {
          setMoonMusic(item.items);
        }
        if (item.title === 'Top 100') {
          setTop100(item?.items);
        }
        if (item.title === 'Album Hot') {
          setAlbum(item?.items);
        }
        if (item.title === 'Radio Nổi bật') {
          setRadio(item?.items);
        }
      });
    }
  }, [allData]);

  const HandleSetDataNewRelease = (type) => {
    setActive(type);
    if (type === 'Tất cả') {
      setNewRelease(release);
    } else if (type === 'Việt Nam') {
      const data = release.filter((item) => {
        if (
          HandleCheckVietnamese(item.title) === true &&
          HandleCheckVietnamese(item.artistsNames) === true
        ) {
          return item;
        }
      });
      setNewRelease(data);
    } else if (type === 'Quốc Tế') {
      const data = release.filter((item) => {
        if (
          HandleCheckVietnamese(item.title) === false &&
          HandleCheckVietnamese(item.artistsNames) === false
        ) {
          return item;
        }
      });
      setNewRelease(data);
    }
  };

  const HandleCheckVietnamese = (text) => {
    const vietnameseCharacters =
      'áàảãạâấầẩẫậăắằẳẵרוĕêếềểễệôốồổỗợơớờởỡợúùủũụđđýỳỹỵỵơôƯƠăĂƯươƠ';
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toLowerCase();
      if (vietnameseCharacters.includes(char)) {
        return true;
      }
    }
    return false;
  };

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ state: false, id: null, type: null }));
  };

  const HandleClosePlaylistPopup = () => {
    setIsPopup({ id: null, state: false });
  };
  const parners = [
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/ingrooves.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/stone-music.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/genie.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/route-note.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/believe.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/kakao.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/danal.png',
  ];

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

  const HandleAddMusicOnMyRecent = async ({ music, index }) => {
    try {
      const data = music.map((item) => item.encodeId);
      dispatch(
        setPlayList({
          id: null,
          data: [],
          index: null,
        }),
      );
      dispatch(setIsPlaying(true));
      dispatch(setSong({ id: data[index], state: true }));
      if (user?.MyRecent?.listMusic.length > 19) {
        if (user?.MyRecent?.listMusic?.includes(data[index])) {
          console.log(data[index]);
          console.log('chỉnh sửa list music với số lượng lớn lớn 3');
          const newData = user?.MyRecent?.listMusic?.filter((num) => num !== data[index]);
          newData.unshift(data[index]);
          await ApiAddMusicOnRecentMusic(dispatch, {
            id: localStorage.getItem('id'),
            data: newData,
          });
        } else {
          console.log('thêm vào đầu và id cuối');
          const newData = [...user?.MyRecent?.listMusic];
          newData.unshift(data[index]);
          newData.pop();
          await ApiAddMusicOnRecentMusic(dispatch, {
            id: localStorage.getItem('id'),
            data: newData,
          });
        }
      } else {
        if (user?.MyRecent?.listMusic.includes(data[index])) {
          console.log(data[index]);
          console.log('chỉnh sửa list music với số lượng nhỏ 3');
          const newData = user?.MyRecent?.listMusic?.filter((num) => num !== data[index]);
          newData.unshift(data[index]);
          await ApiAddMusicOnRecentMusic(dispatch, {
            id: localStorage.getItem('id'),
            data: newData,
          });
        } else {
          console.log('thêm mới');
          await ApiAddMusicOnRecentMusic(dispatch, {
            id: localStorage.getItem('id'),
            data: [...user?.MyRecent?.listMusic, data[index]],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const HandleCheckOut = (e) => {
      if (isPopup.state && !PopupRef.current.contains(e.target)) {
        setIsPopup({ id: null, state: false });
      }
    };

    if (isPopup.state) {
      window.addEventListener('mousedown', HandleCheckOut);

      return () => {
        window.removeEventListener('mousedown', HandleCheckOut);
      };
    }
  }, [isPopup]);
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

  console.log(top100);

  useEffect(() => {
    const HandleCheckOut = (e) => {
      if (MusicPopupRef.current && !MusicPopupRef.current.contains(e.target)) {
        dispatch(setMusicPopup({ state: false, id: null, type: null }));
      }
    };

    window.addEventListener('mousedown', HandleCheckOut);
    return () => {
      window.removeEventListener('mousedown', HandleCheckOut);
    };
  }, [MusicPopupRef]);

  return (
    <div className={style['Home']} ref={HomeRef}>
      <ToastContainer />
      <div className={style['galleries']}>
        <Slider
          {...(resize.width > 1024
            ? { ...settingsBanners }
            : resize.width <= 1024 && resize.width > 767
            ? { ...settingsBanner1 }
            : null)}
          style={{ width: '100%' }}
        >
          {banners?.map((banner, index) => {
            return (
              <Link key={index} to={`${banner.link}`}>
                <img key={banner?.banner} src={banner?.banner} alt="" />
              </Link>
            );
          })}
        </Slider>
      </div>
      {/* <div className={style['recent']}>
                  <h1>Gần Đây</h1>
                  <div className={style['listRecent']}>
                      <div className={style['image']}>
                          <img
                              src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/5/6/d/656da41d575f1474dbdaa51b5004a96c.jpg"
                              alt=""
                          />
                          <h4>Pladio</h4>
                      </div>
                      <div className={style['image']}>
                          <img
                              src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/7/7/8/2/7782e4acfabd4bc4d0232a44769f5e1f.jpg"
                              alt=""
                          />
                          <h4>XONE Radio</h4>
                      </div>
                  </div>
              </div>

              <div className={style['beListen']}>
                  <h1>Có Thể Bạn Muốn Nghe</h1>
                  <div className={style['listBox']}>
                      <div className={style['image']}>
                          <img
                              src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/3/6/6/a3667c186017381c33af3d23acc6d053.jpg"
                              alt=""
                          />
                          <h4>Cà phê cùng Indie Việt</h4>
                          <p>Kai Đinh,Ngọt,Thái Đinh...</p>
                      </div>
                  </div>
              </div> */}
      <div className={style['newRelease']}>
        <h1>Mới Phát Hành</h1>
        <div className={style['chooses']}>
          {['Tất cả', 'Việt Nam', 'Quốc Tế'].map((region) => {
            return (
              <button
                key={region}
                onClick={() => HandleSetDataNewRelease(region)}
                style={
                  region === active
                    ? { backgroundColor: '#9b4de0', color: 'white' }
                    : null
                }
              >
                <h3>{region}</h3>
              </button>
            );
          })}
        </div>

        <div className={style['listMusics']}>
          {newRelease?.map((item, index) => {
            return (
              <div
                className={style['music']}
                key={index}
                style={songs.id === item.encodeId ? { backgroundColor: '#2f2739' } : null}
              >
                {musicPopup?.state &&
                  musicPopup.type === 'newReleases' &&
                  musicPopup?.id === item.encodeId && (
                    <div className={style['musicPopup']} ref={MusicPopupRef}>
                      <MusicPopup
                        onModal={false}
                        music={item}
                        HandleClosePopup={HandleClosePopup}
                      />
                    </div>
                  )}
                <img src={item?.thumbnail} alt="" />
                <div className={style['descript']}>
                  <Link
                    to={item.link}
                    className={style['title']}
                  >{`${HandleEditTitleForMusic(item?.title, 22, 5)}`}</Link>
                  <div className={style['artists']}>
                    {item?.artists?.slice(0, 2)?.map((artist, index) => {
                      return (
                        <Link
                          to={`${HandleEditArtistLink(artist.link)}`}
                          key={index}
                          className={style['artist']}
                        >
                          <p>{artist.name}</p>
                          {index < item.artists.length && index !== 0 && <span>,</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={style['more']}
                  style={songs.id === item.encodeId ? { display: 'block' } : null}
                  onClick={() =>
                    dispatch(
                      setMusicPopup({
                        state: true,
                        id: item.encodeId,
                        type: 'newReleases',
                      }),
                    )
                  }
                >
                  <MdOutlineMoreHoriz className={style['icon']} />
                </div>
                <div
                  className={style['play']}
                  style={songs.id === item.encodeId ? { display: 'block' } : null}
                >
                  {isPlaying && songs.id === item.encodeId ? (
                    <i
                      className={clsx(style.icon, style.playingGif)}
                      onClick={() => dispatch(setIsPlaying(false))}
                    />
                  ) : (
                    <BsFillPlayFill
                      className={style['icon']}
                      onClick={() => {
                        if (item.encodeId !== songs.id) {
                          HandleAddMusicOnMyRecent({
                            music: newRelease,
                            index: index,
                          });
                        } else {
                          dispatch(setIsPlaying(true));
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style['remixMusic']}>
        <h1>Nhạc Remix Cực Bốc</h1>
        <div className={style['listBox']}>
          {listRemix.slice(0, 5)?.map((remix, index) => {
            return (
              <div key={remix?.encodeId} className={style['item']}>
                {isPlayListPopup.state && isPlayListPopup.id === remix.encodeId && (
                  <div className={style['popup']} ref={PopupRef}>
                    <PlaylistPopup
                      item={remix}
                      HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                    />
                  </div>
                )}
                <div
                  className={style['option']}
                  to={remix.link}
                  style={playList.id === remix.encodeId ? { display: 'flex' } : null}
                >
                  <Link to={remix.link}>
                    <div className={style['link']}></div>
                  </Link>
                  {user?.MyFavourites?.listAlbum?.includes(remix.encodeId) ? (
                    <FaHeart
                      className={style['like']}
                      onClick={() => HandleRemoveAlbumOnMyFavourites(remix.encodeId)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={style['love']}
                      onClick={() => HandleAddAlbumOnMyFavourites(remix.encodeId)}
                    />
                  )}
                  <div>
                    {isPlaying && playList.id === remix.encodeId ? (
                      <i
                        className={style['playing']}
                        onClick={() => dispatch(setIsPlaying(false))}
                      ></i>
                    ) : (
                      <BsFillPlayFill
                        className={style['play']}
                        onClick={() => {
                          if (remix.encodeId === playList.id) {
                            dispatch(setIsPlaying(true));
                          } else {
                            runFunctions(remix.encodeId, 0);
                          }
                        }}
                      />
                    )}
                  </div>
                  <CgMoreAlt
                    className={style['more']}
                    onClick={() => {
                      dispatch(setIsPlayListPopup({ id: remix.encodeId, state: true }));
                    }}
                  />
                </div>
                <div className={style['image']}>
                  <img src={remix?.thumbnail} alt="" />
                </div>
                {remix?.sortDescription && (
                  <p className={style['remixTitle']}>{`${HandleEditTitleForMusic(
                    remix?.sortDescription,
                    45,
                    8,
                  )}`}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={style['chillMusic']}>
        <h1>Chill</h1>
        <div className={style['listBox']}>
          {listChill.slice(0, 5)?.map((remix, index) => {
            return (
              <div key={remix?.encodeId} className={style['item']}>
                {isPlayListPopup.state && isPlayListPopup.id === remix.encodeId && (
                  <div className={style['popup']} ref={PopupRef}>
                    <PlaylistPopup
                      item={remix}
                      HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                    />
                  </div>
                )}
                <div
                  className={style['option']}
                  to={remix.link}
                  style={playList.id === remix.encodeId ? { display: 'flex' } : null}
                >
                  <Link to={remix.link}>
                    <div className={style['link']}></div>
                  </Link>
                  {user?.MyFavourites?.listAlbum?.includes(remix.encodeId) ? (
                    <FaHeart
                      className={style['like']}
                      onClick={() => HandleRemoveAlbumOnMyFavourites(remix.encodeId)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={style['love']}
                      onClick={() => HandleAddAlbumOnMyFavourites(remix.encodeId)}
                    />
                  )}
                  <div>
                    {isPlaying && playList.id === remix.encodeId ? (
                      <i
                        className={style['playing']}
                        onClick={() => dispatch(setIsPlaying(false))}
                      ></i>
                    ) : (
                      <BsFillPlayFill
                        className={style['play']}
                        onClick={() => {
                          if (remix.encodeId === playList.id) {
                            dispatch(setIsPlaying(true));
                          } else {
                            runFunctions(remix.encodeId, 0);
                          }
                        }}
                      />
                    )}
                  </div>
                  <CgMoreAlt
                    className={style['more']}
                    onClick={() => {
                      dispatch(setIsPlayListPopup({ id: remix.encodeId, state: true }));
                    }}
                  />
                </div>
                <div className={style['image']}>
                  <img src={remix?.thumbnail} alt="" />
                </div>

                {remix?.sortDescription && (
                  <p className={style['remixTitle']}>{`${HandleEditTitleForMusic(
                    remix?.sortDescription,
                    45,
                    8,
                  )}`}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={style['moonMusic']}>
        <h1>Nhạc Tâm Trạng Tan Chậm</h1>
        <div className={style['listBox']}>
          {moonMusic.slice(0, 5)?.map((remix, index) => {
            return (
              <div key={remix?.encodeId} className={style['item']}>
                {isPlayListPopup.state && isPlayListPopup.id === remix.encodeId && (
                  <div className={style['popup']} ref={PopupRef}>
                    <PlaylistPopup
                      item={remix}
                      HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                    />
                  </div>
                )}
                <div
                  className={style['option']}
                  to={remix.link}
                  style={playList.id === remix.encodeId ? { display: 'flex' } : null}
                >
                  <Link to={remix.link}>
                    <div className={style['link']}></div>
                  </Link>
                  {user?.MyFavourites?.listAlbum?.includes(remix.encodeId) ? (
                    <FaHeart
                      className={style['like']}
                      onClick={() => HandleRemoveAlbumOnMyFavourites(remix.encodeId)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={style['love']}
                      onClick={() => HandleAddAlbumOnMyFavourites(remix.encodeId)}
                    />
                  )}
                  <div>
                    {isPlaying && playList.id === remix.encodeId ? (
                      <i
                        className={style['playing']}
                        onClick={() => dispatch(setIsPlaying(false))}
                      ></i>
                    ) : (
                      <BsFillPlayFill
                        className={style['play']}
                        onClick={() => {
                          if (remix.encodeId === playList.id) {
                            dispatch(setIsPlaying(true));
                          } else {
                            runFunctions(remix.encodeId, 0);
                          }
                        }}
                      />
                    )}
                  </div>
                  <CgMoreAlt
                    className={style['more']}
                    onClick={() => {
                      dispatch(setIsPlayListPopup({ id: remix.encodeId, state: true }));
                    }}
                  />
                </div>
                <div className={style['image']}>
                  <img src={remix?.thumbnail} alt="" />
                </div>
                {remix?.sortDescription && (
                  <p className={style['remixTitle']}>{`${HandleEditTitleForMusic(
                    remix?.sortDescription,
                    45,
                    8,
                  )}`}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={style['Top100']}>
        <h1>Top 100</h1>
        <div className={style['listBox']}>
          {top100.slice(0, 5)?.map((remix, index) => {
            return (
              <div key={remix?.encodeId} className={style['item']}>
                {isPlayListPopup.state && isPlayListPopup.id === remix.encodeId && (
                  <div className={style['popup']} ref={PopupRef}>
                    <PlaylistPopup
                      item={remix}
                      HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                    />
                  </div>
                )}
                <div
                  className={style['option']}
                  to={remix.link}
                  style={playList.id === remix.encodeId ? { display: 'flex' } : null}
                >
                  <Link to={remix.link}>
                    <div className={style['link']}></div>
                  </Link>
                  {user?.MyFavourites?.listAlbum?.includes(remix.encodeId) ? (
                    <FaHeart
                      className={style['like']}
                      onClick={() => HandleRemoveAlbumOnMyFavourites(remix.encodeId)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={style['love']}
                      onClick={() => HandleAddAlbumOnMyFavourites(remix.encodeId)}
                    />
                  )}
                  <div>
                    {isPlaying && playList.id === remix.encodeId ? (
                      <i
                        className={style['playing']}
                        onClick={() => dispatch(setIsPlaying(false))}
                      ></i>
                    ) : (
                      <BsFillPlayFill
                        className={style['play']}
                        onClick={() => {
                          if (remix.encodeId === playList.id) {
                            dispatch(setIsPlaying(true));
                          } else {
                            runFunctions(remix.encodeId, 0);
                          }
                        }}
                      />
                    )}
                  </div>
                  <CgMoreAlt
                    className={style['more']}
                    onClick={() => {
                      dispatch(setIsPlayListPopup({ id: remix.encodeId, state: true }));
                    }}
                  />
                </div>
                <div className={style['image']}>
                  <img src={remix?.thumbnail} alt="" />
                </div>
                {remix?.sortDescription && (
                  <h4>{`${HandleEditTitleForMusic(remix?.sortDescription, 45, 4)}`}</h4>
                )}

                <div className={style['artists']}>
                  {remix?.artists.slice(0, 3)?.map((artist, index) => {
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
      <div className={style['AlbumHot']}>
        <h1>Album Hot</h1>
        <div className={style['listBox']}>
          {album.slice(0, 5)?.map((remix, index) => {
            return (
              <div key={remix?.encodeId} className={style['item']}>
                {isPlayListPopup.state && isPlayListPopup.id === remix.encodeId && (
                  <div className={style['popup']} ref={PopupRef}>
                    <PlaylistPopup
                      item={remix}
                      HandleClosePlaylistPopup={HandleClosePlaylistPopup}
                    />
                  </div>
                )}
                <div
                  className={style['option']}
                  to={remix.link}
                  style={playList.id === remix.encodeId ? { display: 'flex' } : null}
                >
                  <Link to={remix.link}>
                    <div className={style['link']}></div>
                  </Link>
                  {user?.MyFavourites?.listAlbum?.includes(remix.encodeId) ? (
                    <FaHeart
                      className={style['like']}
                      onClick={() => HandleRemoveAlbumOnMyFavourites(remix.encodeId)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={style['love']}
                      onClick={() => HandleAddAlbumOnMyFavourites(remix.encodeId)}
                    />
                  )}
                  <div>
                    {isPlaying && playList.id === remix.encodeId ? (
                      <i
                        className={style['playing']}
                        onClick={() => dispatch(setIsPlaying(false))}
                      ></i>
                    ) : (
                      <BsFillPlayFill
                        className={style['play']}
                        onClick={() => {
                          if (remix.encodeId === playList.id) {
                            dispatch(setIsPlaying(true));
                          } else {
                            runFunctions(remix.encodeId, 0);
                          }
                        }}
                      />
                    )}
                  </div>
                  <CgMoreAlt
                    className={style['more']}
                    onClick={() => {
                      dispatch(setIsPlayListPopup({ id: remix.encodeId, state: true }));
                    }}
                  />
                </div>
                <div className={style['image']}>
                  <img src={remix?.thumbnail} alt="" />
                </div>
                <h4>{`${HandleEditTitleForMusic(remix.title, 20, 4)}`}</h4>
                <p className={style['remixTitle']}>{remix?.artistsNames}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style['Radio']}>
        <h1>Radio Nổi Bật</h1>
        <div className={style['listBox']}>
          {radio?.map((remix) => {
            return (
              <div key={remix?.encodeId} className={style['item']}>
                <img src={remix?.thumbnail} alt="" />
                <h4>{`${remix.title.substring(0, 15)} ...`}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style['parners']}>
        <h3>Đối tác âm nhạc</h3>
        <div className={style['listParner']}>
          {parners.map((parner) => {
            return (
              <div key={parner}>
                <img src={parner} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
