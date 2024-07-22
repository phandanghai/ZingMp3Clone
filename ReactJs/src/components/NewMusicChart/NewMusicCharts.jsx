import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './NewMusicCharts.module.scss';
import clsx from 'clsx';
import { ApiGetHome } from '../../redux/ApiMusic';
import { FaPlay } from 'react-icons/fa6';
import { PiMicrophoneStageDuotone } from 'react-icons/pi';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayList, setSong } from '../../redux/musicSlider';
import { ApiGetListMusic } from '../../redux/ApiAccount';
import { HandleAddMusicOnMyRecent } from '../../AllFunctions/AllFunctions';
import { setMusicPopup } from '../../redux/musicSlider';
import { setIsPlaying } from '../../redux/stateSlider';
import MusicPopup from '../Modal/MusicModal/MusicPopup';
import { ApiAddMusicOnMyFavourites } from '../../redux/ApiAccount';
function NewMusicCharts() {
  const dispatch = useDispatch();
  const MusicPopupRef = useRef();
  const [listIds, setListIds] = useState([]);
  const [charts, setCharts] = useState([]);
  const songs = useSelector((state) => state.music.song);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const user = useSelector((state) => state.account.account);
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const padZero = (num) => {
    return (num < 10 ? '0' : '') + num;
  };
  const setTimes = (duration) => {
    const minutes = padZero(Math.floor(duration / 60));
    const seconds = padZero(Math.floor(duration % 60));
    return `${minutes}:${seconds}`;
  };
  useEffect(() => {
    ApiGetHome().then((data) => {
      data.data.items.map((item) => {
        if (item.title === 'BXH Nhạc Mới') {
          const list = item.items.map((item) => {
            return item.encodeId;
          });

          setListIds(list);
        }
      });
    });
  }, []);

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
  const runFunctions = async (id) => {
    try {
      dispatch(setSong({ id: id, state: true }));
      dispatch(setIsPlaying(true));
      dispatch(setPlayList({ id: null, data: [], index: null }));
      await HandleAddMusicOnMyRecent(dispatch, user, id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const padZero = (num) => {
      return (num < 10 ? '0' : '') + num;
    };
    const setTimes = (duration) => {
      const minutes = padZero(Math.floor(duration / 60));
      const seconds = padZero(Math.floor(duration % 60));
      return `${minutes}:${seconds}`;
    };
    if (listIds.length > 0) {
      console.log(listIds);
      console.log('gọi api lấy data music ...');
      ApiGetListMusic(listIds).then((result) => {
        const newData = result.map((item) => {
          return {
            ...item,
            time: setTimes(item.duration),
          };
        });

        setCharts(newData);
      });
    }
  }, [listIds]);

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ id: null, state: false, type: null }));
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
  return (
    <div className={style['NewMusicCharts']}>
      <div className={style['title']}>
        <h1>BXH Nhạc Mới</h1>
        <div className={style['logo']}>
          <FaPlay className={style['icon']} />
        </div>
      </div>

      <div className={style['listMusics']}>
        {charts?.map((chart, index) => {
          return (
            <div key={index} className={style['chart']}>
              {musicPopup.id === chart.encodeId &&
                musicPopup.state &&
                musicPopup.type === 'newMusic' && (
                  <div className={style['musicPopup']} ref={MusicPopupRef}>
                    <MusicPopup
                      onModal={false}
                      music={chart}
                      HandleClosePopup={HandleClosePopup}
                    />
                  </div>
                )}
              <h2
                style={
                  index === 0
                    ? { WebkitTextStroke: '1px #4a90e2  ' }
                    : index === 1
                    ? { WebkitTextStroke: '1px #50e3c2' }
                    : index === 2
                    ? { WebkitTextStroke: '1px #e35050' }
                    : null
                }
              >
                {index + 1}
              </h2>
              <img src={chart.thumbnail} alt="" />
              <div className={style['info']}>
                <Link to={`${chart.link}`} style={{ display: 'block', zIndex: 99 }}>
                  {' '}
                  <h4>{chart.title}</h4>
                </Link>
                <div className={style['artists']}>
                  {chart?.artists?.map((arist, index) => {
                    return (
                      <div className={style['artist']} key={index} style={{ zIndex: 99 }}>
                        <Link>
                          <p key={arist.id}>{arist.name}</p>
                        </Link>
                        {index < chart.artists.length - 1 && <span> , </span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Link to={`${chart.album.link}`} className={style['album']}>
                {chart?.album?.title}
              </Link>
              <p className={style['time']}>{chart.time}</p>

              <div
                className={style['option']}
                style={songs.id === chart.encodeId ? { display: 'flex' } : null}
              >
                <div>
                  {songs.id === chart.encodeId && isPlaying ? (
                    <i
                      className={style['playing']}
                      style={{ marginLeft: 5, marginTop: 5 }}
                      onClick={() => dispatch(setIsPlaying(false))}
                    ></i>
                  ) : (
                    <BsFillPlayFill
                      className={style['play']}
                      onClick={() => {
                        if (songs.id === chart.encodeId) {
                          dispatch(setIsPlaying(true));
                        } else {
                          runFunctions(chart.encodeId);
                        }
                      }}
                    />
                  )}
                </div>
                <div className={style['mic']}>
                  <PiMicrophoneStageDuotone className={style['icon']} />
                </div>
                <div className={style['love']}>
                  {!user?.MyFavourites?.listMusic.includes(chart.encodeId) ? (
                    <CiHeart
                      className={style['icon']}
                      onClick={() => HandleAddMusicOnMyFavourites(chart?.encodeId)}
                    />
                  ) : (
                    <FaHeart
                      className={clsx(style['icon'], style.active)}
                      onClick={() => HandleRemoveMusicOnMyFavourites(chart?.encodeId)}
                    />
                  )}
                </div>
                <div
                  className={style['more']}
                  onClick={() =>
                    dispatch(
                      setMusicPopup({
                        id: chart.encodeId,
                        state: true,
                        type: 'newMusic',
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
    </div>
  );
}

export default NewMusicCharts;
