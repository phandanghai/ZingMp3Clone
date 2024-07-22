import { useEffect, useState, useRef } from 'react';
import style from './SongPlayer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { ApiGetPlayList, ApiGetSong, ApiGetSongInfo } from '../../redux/ApiMusic';
import { LiaMicrophoneAltSolid } from 'react-icons/lia';
import { VscSyncIgnored } from 'react-icons/vsc';
import { IoVolumeMediumOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import {
  MdOutlineMoreHoriz,
  MdRepeatOne,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { RiPlayListFill } from 'react-icons/ri';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FaHeart } from 'react-icons/fa';
import { LiaRandomSolid } from 'react-icons/lia';
import { IoPlayCircleOutline, IoPauseCircleOutline } from 'react-icons/io5';
import {
  setPlayList,
  setShowModal,
  setSong,
  setListMusicModal,
  setMusicPopup,
} from '../../redux/musicSlider';
import MusicPopup from '../Modal/MusicModal/MusicPopup';
import {
  ApiAddMusicOnMyFavourites,
  ApiRemoveMusicOnMyFavourites,
} from '../../redux/ApiAccount';
import {
  setIsEnded,
  setIsLoginPopup,
  setIsPlaying,
  setIsRandom,
  setIsRepeat,
} from '../../redux/stateSlider';
function SongPlayer() {
  const musicPopupRef = useRef();
  const musicPopup = useSelector((state) => state.music.musicPopup);
  const showListMusic = useSelector((state) => state?.music?.listMusicModal);
  const audioRef = useRef();
  const dispatch = useDispatch();
  const [url, setUrl] = useState();
  const isRepeat = useSelector((state) => state.state.isRepeat);
  const user = useSelector((state) => state.account.account);
  const songs = useSelector((state) => state.music.song);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const isRandom = useSelector((state) => state.state.isRandom);
  const playList = useSelector((state) => state.music.playList);
  const showModal = useSelector((state) => state.music.showModal);
  const [info, setInfo] = useState({});
  useEffect(() => {
    ApiGetSongInfo({ id: songs.id }).then((data) => {
      setInfo(data.data);
      ApiGetSong({ id: songs.id }).then((data) => {
        setUrl(data.data);
        if (!data.data) {
          dispatch(setSong({ id: null, state: false }));
          dispatch(setIsLoginPopup(true));
        }
      });
    });
  }, [songs]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.audio.current.play();
      } else {
        audioRef.current.audio.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  const HandlePlayMusic = () => {
    dispatch(setSong({ id: songs.id, state: songs.state }));
  };

  const HandlePauseMusic = () => {
    dispatch(setSong({ id: songs.id, state: songs.state }));
  };
  const HandleAddMusicOnMyFavourites = () => {
    ApiAddMusicOnMyFavourites(dispatch, {
      id: localStorage.getItem('id'),
      data: [...user?.MyFavourites?.listMusic, songs.id],
    });
  };

  const HandleRemoveMusicOnMyFavourites = () => {
    ApiAddMusicOnMyFavourites(dispatch, {
      id: localStorage.getItem('id'),
      data: user?.MyFavourites?.listMusic.filter((num) => num !== songs.id),
    });
  };
  const HandleClickNext = () => {
    if (playList.index < playList.data.length - 1) {
      dispatch(
        setPlayList({ id: playList.id, index: playList.index + 1, data: playList.data }),
      );
      dispatch(setSong({ id: playList.data[playList.index + 1], state: true }));
      ApiGetSongInfo({ id: playList.data[playList.index + 1] }).then((data) => {
        setInfo(data.data);
        ApiGetSong({ id: playList.data[playList.index + 1] }).then((data) => {
          setUrl(data.data);
          if (!data.data) {
            dispatch(setSong({ id: null, state: false }));
            dispatch(setIsLoginPopup(true));
          }
        });
      });
    } else {
      console.log('đây là bài cuối');
    }
  };

  const HandleClickPrevious = () => {
    if (playList.index !== 0) {
      dispatch(
        setPlayList({ id: playList.id, index: playList.index - 1, data: playList.data }),
      );
      dispatch(setSong({ id: playList.data[playList.index - 1], state: true }));
      ApiGetSongInfo({ id: playList.data[playList.index - 1] }).then((data) => {
        setInfo(data.data);
        ApiGetSong({ id: playList.data[playList.index - 1] }).then((data) => {
          console.log(data.data);
          setUrl(data.data);
          if (!data.data) {
            dispatch(setSong({ id: null, state: false }));
            dispatch(setIsLoginPopup(true));
          }
        });
      });
    } else {
      console.log('đây là bài đầu tiên');
    }
  };

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

  const HandleClosePopup = () => {
    dispatch(setMusicPopup({ id: null, state: false, type: null }));
  };

  const HandleNextMusic = () => {
    console.log('random bài hát');
    if (!isRandom) {
      dispatch(setSong({ id: playList.data[playList.index + 1], state: true }));
      dispatch(
        setPlayList({ id: playList.id, data: playList.data, index: playList.index + 1 }),
      );
    } else {
      const length = playList.data.length;
      const random = Math.floor(Math.random() * length);
      console.log(random);
      dispatch(setSong({ id: playList.data[random], state: true }));
      dispatch(setPlayList({ id: playList.id, data: playList.data, index: random }));
    }
  };

  console.log(url);
  return (
    <div
      className={style['SongPlayer']}
      style={showModal && url ? { transform: 'translateY(100%)' } : null}
    >
      {url && (
        <>
          {musicPopup?.state &&
            musicPopup.type === 'songplayer' &&
            musicPopup?.id === songs.id && (
              <div className={style['musicPopup']} ref={musicPopupRef}>
                <MusicPopup
                  onModal={true}
                  music={info}
                  HandleClosePopup={HandleClosePopup}
                />
              </div>
            )}
          <div className={style['left']}>
            <div className={style['love']}>
              {!user?.MyFavourites.listMusic?.includes(songs.id) ? (
                <CiHeart
                  className={style['icon']}
                  onClick={HandleAddMusicOnMyFavourites}
                />
              ) : (
                <FaHeart
                  className={clsx(style['icon'], style.active)}
                  onClick={HandleRemoveMusicOnMyFavourites}
                />
              )}
            </div>
            <div
              className={style['more']}
              onClick={() =>
                dispatch(
                  setMusicPopup({ id: info.encodeId, state: true, type: 'songplayer' }),
                )
              }
            >
              <MdOutlineMoreHoriz className={style['icon']} />
            </div>
            <img src={info?.thumbnail} alt="" />
            <div className={style['detal']}>
              <div className={style['title']}>
                {info?.title?.length > 20 ? (
                  <h4 className={style['scroll']}>{`${info?.title}`}</h4>
                ) : (
                  <h4>{info?.title}</h4>
                )}
              </div>
              <p>{info?.artistsNames}</p>
            </div>
          </div>

          <div className={style['middle']}>
            {url && (
              <AudioPlayer
                autoPlay={isPlaying}
                showSkipControls={true}
                ref={audioRef}
                style={{ background: 'transparent' }}
                loop={false}
                src={url && url[128]}
                onClickNext={HandleClickNext}
                onClickPrevious={HandleClickPrevious}
                onEnded={() => {
                  if (playList.data.length > 0) {
                    if (isRepeat) {
                      dispatch(setIsPlaying(true));
                    } else {
                      HandleNextMusic();
                    }
                  } else {
                    if (isRepeat) {
                      dispatch(setIsPlaying(true));
                    } else {
                      dispatch(setIsPlaying(false));
                    }
                  }
                }}
                customIcons={{
                  play: (
                    <IoPlayCircleOutline
                      className={style['icon']}
                      onClick={() => dispatch(setIsPlaying(true))}
                    />
                  ),
                  pause: (
                    <IoPauseCircleOutline
                      className={style['icon']}
                      onClick={() => dispatch(setIsPlaying(false))}
                    />
                  ),
                  loop: (
                    <MdRepeatOne
                      className={style['icon']}
                      onClick={() => dispatch(setIsRepeat(false))}
                    />
                  ),
                  loopOff: (
                    <VscSyncIgnored
                      className={style['icon']}
                      onClick={() => dispatch(setIsRepeat(true))}
                    />
                  ),
                  next: (
                    <MdSkipNext
                      className={style['icon']}
                      style={
                        playList.index < playList.data.length - 1
                          ? {}
                          : { cursor: 'no-drop' }
                      }
                    />
                  ),
                  previous: (
                    <MdSkipPrevious
                      className={style['icon']}
                      style={playList.index !== 0 ? {} : { cursor: 'no-drop' }}
                    />
                  ),
                }}
              />
            )}
            {playList.data.length > 0 && (
              <LiaRandomSolid
                className={style['random']}
                onClick={() => dispatch(setIsRandom(!isRandom))}
                style={isRandom ? {} : { WebkitFilter: 'invert(25%)' }}
              />
            )}
          </div>
          <div className={style['right']}>
            <div className={style['mvIcon']}>
              <div className={style['icon']}>
                <h4>MV</h4>
              </div>
            </div>
            <div
              className={style['micIcon']}
              style={
                playList.data.length === 0
                  ? { cursor: 'not-allowed' }
                  : { cursor: 'pointer' }
              }
              onClick={() => {
                if (playList.data.length > 0) {
                  dispatch(setShowModal(true));
                  dispatch(setListMusicModal(false));
                }
              }}
            >
              <LiaMicrophoneAltSolid className={style['icon']} />
            </div>
            <div
              className={style['playlist']}
              onClick={() => dispatch(setListMusicModal(!showListMusic))}
              style={showListMusic ? { backgroundColor: '#9b4de0' } : null}
            >
              <RiPlayListFill className={style['icon']} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SongPlayer;
