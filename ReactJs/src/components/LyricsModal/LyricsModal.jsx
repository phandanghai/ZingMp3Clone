import { useEffect, useState, useRef } from 'react';
import style from './LyricsModal.module.scss';
import clsx from 'clsx';
import { ApiGetPlayList } from '../../redux/ApiMusic';
import { FaAngleLeft, FaAngleRight, FaHeart } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { IoIosPlay } from 'react-icons/io';
import { IoPause } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayList, setShowModal, setSong } from '../../redux/musicSlider';
import { ApiGetListMusic } from '../../redux/ApiAccount';
import { setIsPlaying } from '../../redux/stateSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ApiAddMusicOnMyFavourites } from '../../redux/ApiAccount';

function LyricsModal() {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const user = useSelector((state) => state.account.account);
  const [thumbnail, setThumbnail] = useState([]);
  const [resize, setResize] = useState({
    width: null,
    height: null,
  });
  const [active, setActive] = useState(null);
  const song = useSelector((state) => state.music.song);
  const showModal = useSelector((state) => state.music.showModal);
  const playList = useSelector((state) => state.music.playList);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const PreviousArrowButton = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: 'white',
          padding: 10,
          position: 'absolute',
          top: 65,
          left: -40,
          zIndex: 100,
          padding: 5,
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <FaAngleLeft
          className={style['icon']}
          style={{
            position: 'absolute',
            WebkitFilter: 'invert(100%)',
            width: 20,
            height: 20,
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
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: 'white',
          padding: 10,
          position: 'absolute',
          top: 65,
          right: -30,
          zIndex: 100,
          padding: 5,
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <FaAngleRight
          className={style['icon']}
          style={{
            position: 'absolute',
            WebkitFilter: 'invert(100%)',
            width: 20,
            height: 20,
          }}
        />
      </div>
    );
  };

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '150px',
    slidesToShow: 3,
    speed: 500,
    nextArrow: false,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };

  const settingsIpad = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '150px',
    slidesToShow: 2,
    speed: 500,
    nextArrow: false,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };

  const settingsIPhone = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '150px',
    slidesToShow: 1,
    speed: 500,
    nextArrow: false,
    nextArrow: <NextArrowButton />,
    prevArrow: <PreviousArrowButton />,
  };
  useEffect(() => {
    if (playList?.data?.length > 0) {
      ApiGetListMusic(playList.data).then((result) => {
        setThumbnail(result);
      });
    }
  }, [window.location.href, playList]);

  const HandlePlayMusic = (index) => {
    dispatch(
      setPlayList({
        ...playList,
        index: index,
      }),
    );
    dispatch(setSong({ id: playList.data[index], state: true }));
    dispatch(setIsPlaying(true));
    setActive(index);
  };

  useEffect(() => {
    if (thumbnail) {
      const index = thumbnail.findIndex((item) => item.encodeId === song.id);
      setActive(index);
    }
  }, [thumbnail]);
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(active);
    }
  }, [active]);

  useEffect(() => {
    setResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

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
  return (
    <div
      className={
        showModal ? clsx(style.LyricsModal, style.open) : clsx(style.LyricsModal)
      }
    >
      <div className={style['boxIcon']} onClick={() => dispatch(setShowModal(false))}>
        <MdOutlineKeyboardArrowDown className={style['icon']} />
      </div>
      <div className={style['modal']}>
        <Slider
          {...(resize?.width > 1024
            ? { ...settings }
            : resize.width > 768 && resize.width < 1024
            ? { ...settingsIpad }
            : { ...settingsIPhone })}
          style={{ width: '100%', height: '100%' }}
          ref={sliderRef}
        >
          {thumbnail?.map((item, index) => {
            return (
              <div key={index} className={style['item']}>
                <img src={item?.thumbnailM} alt="" />
                <h3>{item?.title}</h3>
                <div className={style['option']}>
                  <div className={style['playMusic']}>
                    {song.id === item.encodeId && isPlaying ? (
                      <IoPause
                        className={style['pause']}
                        onClick={() => dispatch(setIsPlaying(false))}
                      />
                    ) : (
                      <IoIosPlay
                        className={style['icon']}
                        onClick={() => HandlePlayMusic(index)}
                      />
                    )}
                  </div>

                  {user?.MyFavourites?.listMusic.includes(item.encodeId) ? (
                    <div
                      className={style['love']}
                      onClick={() => HandleRemoveMusicOnMyFavourites(item?.encodeId)}
                    >
                      <FaHeart className={style['icon']} />
                    </div>
                  ) : (
                    <div
                      className={style['heart']}
                      onClick={() => HandleAddMusicOnMyFavourites(item.encodeId)}
                    >
                      <CiHeart className={style['icon']} />
                    </div>
                  )}
                  {song.id === item.encodeId && isPlaying && (
                    <div className={style['playing']}>
                      <img
                        className={style['gif']}
                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default LyricsModal;
