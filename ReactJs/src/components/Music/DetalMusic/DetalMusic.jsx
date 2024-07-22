import { useState, useEffect, useRef } from 'react';
import style from './DetalMusic.module.scss';
import clsx from 'clsx';
import { ApiGetSongInfo } from '../../../redux/ApiMusic';
import moment from 'moment';
import { CiHeart } from 'react-icons/ci';
import { FaPlay } from 'react-icons/fa';
import { CgMoreAlt } from 'react-icons/cg';
import { CiPlay1 } from 'react-icons/ci';
import { IoMicOutline } from 'react-icons/io5';
import { ApiGetPlayList } from '../../../redux/ApiMusic';
import { setPlayList, setSong } from '../../../redux/musicSlider';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPlaying } from '../../../redux/stateSlider';
import { HandleAddMusicOnMyRecent } from '../../../AllFunctions/AllFunctions';
import MusicPopup from '../../Modal/MusicModal/MusicPopup';
import { setMusicPopup } from '../../../redux/musicSlider';
import { ToastContainer, toast } from 'react-toastify';
import { BsFillPlayFill } from 'react-icons/bs';
import { ApiAddMusicOnMyFavourites } from '../../../redux/ApiAccount';
function DetalMusic() {
  const MusicPopupRef = useRef();
  const [info, setInfo] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.account);
  const songs = useSelector((state) => state.music.song);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const musicPopup = useSelector((state) => state.music.musicPopup);
  useEffect(() => {
    const padZero = (num) => {
      return (num < 10 ? '0' : '') + num;
    };
    const setTimes = (duration) => {
      const minutes = padZero(Math.floor(duration / 60));
      const seconds = padZero(Math.floor(duration % 60));
      return `${minutes}:${seconds}`;
    };
    const id = window.location.href.split('/')[5];
    ApiGetSongInfo({ id: id.slice(0, -5) }).then((data) => {
      const list = {
        ...data.data,
        time: padZero(setTimes(data.data.duration)),
      };
      setInfo(list);
    });
  }, []);

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ state: false, id: null, type: null }));
  };

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
  return (
    <div className={style['DetalMusic']}>
      <ToastContainer />
      {musicPopup?.state &&
        musicPopup.type === 'music' &&
        musicPopup?.id === window.location.href.split('/')[5].slice(0, -5) && (
          <div className={style['musicPopup']} ref={MusicPopupRef}>
            <MusicPopup
              onModal={false}
              music={info}
              HandleClosePopup={HandleClosePopup}
              // idPlaylist={idPlaylist}
            />
          </div>
        )}
      <div className={style['media']}>
        <div className={style['media-header']}>
          <h4 className={style['name']}>Bài hát</h4>
          <h4 className={style['time']}>Thời gian</h4>
        </div>
        <div className={style['media-contain']}>
          <div
            className={style['image']}
            style={
              songs.id === window.location.href.split('/')[5].slice(0, -5)
                ? { display: 'block' }
                : null
            }
          >
            {songs.id === window.location.href.split('/')[5].slice(0, -5) && isPlaying ? (
              <i
                className={clsx(style.playingGif)}
                onClick={() => dispatch(setIsPlaying(false))}
              />
            ) : (
              <BsFillPlayFill
                className={style['icon']}
                onClick={() => {
                  if (songs.id === window.location.href.split('/')[5].slice(0, -5)) {
                    dispatch(setIsPlaying(true));
                  } else {
                    runFunctions(window.location.href.split('/')[5].slice(0, -5));
                  }
                }}
              />
            )}
          </div>
          <div
            className={style['option']}
            style={
              songs.id === window.location.href.split('/')[5].slice(0, -5)
                ? { display: 'flex' }
                : null
            }
          >
            <div className={style['action']}>
              {!user?.MyFavourites?.listMusic.includes(
                window.location.href.split('/')[5].slice(0, -5),
              ) ? (
                <div className={style['love']}>
                  <CiHeart
                    className={style['icon']}
                    onClick={() =>
                      HandleAddMusicOnMyFavourites(
                        window.location.href.split('/')[5].slice(0, -5),
                      )
                    }
                  />
                </div>
              ) : (
                <div className={style['like']}>
                  <FaHeart
                    className={clsx(style['icon'], style.active)}
                    onClick={() =>
                      HandleRemoveMusicOnMyFavourites(
                        window.location.href.split('/')[5].slice(0, -5),
                      )
                    }
                  />
                </div>
              )}
              <div className={style['lyrics']}>
                <IoMicOutline />
              </div>{' '}
              <div
                className={style['more']}
                onClick={() =>
                  dispatch(
                    setMusicPopup({
                      state: true,
                      id: window.location.href.split('/')[5].slice(0, -5),
                      type: 'music',
                    }),
                  )
                }
              >
                <CgMoreAlt />
              </div>
            </div>
          </div>
          <h3>1</h3>
          <img src={info?.thumbnailM} alt="" />
          <div className={style['info']}>
            <h4>{info?.title}</h4>
            <p>{info?.artistsNames}</p>
          </div>
          <h4
            className={style['time']}
            style={
              songs.id === window.location.href.split('/')[5].slice(0, -5)
                ? { display: 'none' }
                : null
            }
          >
            {info?.time}
          </h4>
        </div>
      </div>
      <div className={style['information']}>
        <h5>Thông Tin</h5>
        <div className={style['numbers']}>
          <p>Số bài hát</p>
          <span>1</span>
        </div>
        <div className={style['dates']}>
          <p>Ngày phát hành</p>
          <span>{`${moment(info?.album?.releaseDate).format('DD/MM/YYYY')}`}</span>
        </div>
        <div className={style['company']}>
          <p>Cung cấp bởi</p>
          <span>{info?.distributor}</span>
        </div>
      </div>
    </div>
  );
}

export default DetalMusic;
