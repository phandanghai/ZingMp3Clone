import { useEffect, useRef, useState } from 'react';
import style from './MyPlayList.module.scss';
import clsx from 'clsx';
import Add from '../../../public/add.svg';
import NewPlayListPopup from '../NewPlayListPopup/NewPlayListPopup';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';
import { CgMoreAlt } from 'react-icons/cg';
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import MyPlayListPopup from '../Modal/MyPlayListPopup/MyPlayListPopup';
import { ApiGetMyPlayList } from '../../redux/ApiAccount';
import { setPlayList, setSong } from '../../redux/musicSlider';
import { setIsNewPlayListPopup, setIsPlaying } from '../../redux/stateSlider';
import { ApiDeletePlayList } from '../../redux/ApiAccount';
function MyPlayList() {
  const dispatch = useDispatch();
  const Popup = useRef();
  const playListPopup = useRef();
  const MoreRef = useRef();
  const [active, setActive] = useState('Tất cả');
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState({
    id: null,
    state: false,
  });
  const [myPlayList, setMyPlayList] = useState([]);
  const [openPlaylist, setOpenPlaylist] = useState({ id: null, state: false });
  const user = useSelector((state) => state.account.account);
  const playList = useSelector((state) => state.music.playList);
  const isPlaying = useSelector((state) => state.state.isPlaying);
  const HandleClickOutside = (e) => {
    if (open && !Popup.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('mousedown', HandleClickOutside);
      return () => {
        window.removeEventListener('mousedown', HandleClickOutside);
      };
    }
  }, [open]);

  useEffect(() => {
    ApiGetMyPlayList({ id: localStorage.getItem('id') }).then((data) => {
      setMyPlayList(data.myPlayList);
    });
  }, []);

  useEffect(() => {
    const HandleCheckOutSide = (e) => {
      if (openPlaylist.state && !playListPopup.current.contains(e.target)) {
        setOpenPlaylist({ id: null, state: false });
      }
    };

    window.addEventListener('mousedown', HandleCheckOutSide);
    return () => {
      window.removeEventListener('mousedown', HandleCheckOutSide);
    };
  }, [openPlaylist]);

  const HandleClosePlayListPopup = () => {
    setOpenPlaylist({ id: null, state: false });
  };

  const runFunctions = (item) => {
    dispatch(setPlayList({ id: item.id, data: item.listIdMusics, index: 0 }));
    dispatch(setSong({ id: item.listIdMusics[0], state: true }));
  };

  const HandleDeletePlaylist = (id) => {
    const newData = user.MyPlayList.filter((encodeId) => !encodeId !== id);
    ApiDeletePlayList(dispatch, {
      idUser: localStorage.getItem('id'),
      MyPlayList: newData,
      id: id,
    }).then((result) => {
      window.location.reload();
    });
  };
  return (
    <div className={style['MyPlayList']}>
      <div className={style['menu']}>
        <h1>Playlist</h1>
        {['Tất cả', 'Của tôi'].map((title) => {
          return (
            <div
              key={title}
              onClick={() => setActive(title)}
              className={clsx(style.title)}
              style={
                active === title
                  ? { borderBottom: '2px solid #9b4de0', color: '#fff' }
                  : null
              }
            >
              <h3>{title}</h3>
            </div>
          );
        })}
      </div>

      <div className={style['content']}>
        <div
          className={style['newPlayList']}
          onClick={() => dispatch(setIsNewPlayListPopup(true))}
        >
          <div className={style['add']}>
            <IoIosAddCircleOutline className={style['icon']} />
          </div>
          <p>Tạo playlist mới</p>
        </div>
        <div className={style['listPlayList']}>
          {myPlayList?.map((item) => {
            return (
              <div className={style['item']}>
                {openPlaylist.state && item.id === openPlaylist.id && (
                  <div className={style['popup']} ref={playListPopup}>
                    <MyPlayListPopup
                      HandleClosePlayListPopup={HandleClosePlayListPopup}
                    />
                  </div>
                )}
                <div
                  className={style['option']}
                  style={
                    item.id === playList.id
                      ? { display: 'flex', color: '#fff' }
                      : { color: '#fff' }
                  }
                >
                  <Link to={`/myplaylist/${item.alias}/${item.id}.html`}>
                    <div className={style['link']}></div>
                  </Link>
                  <div
                    className={style['close']}
                    onClick={() => setIsDelete({ id: item.id, state: true })}
                  >
                    <IoMdClose className={style['icon']} />
                  </div>
                  <div>
                    {playList.id === item.id && isPlaying ? (
                      <i
                        className={style['playing']}
                        style={{ marginLeft: 5, marginTop: 5 }}
                        onClick={() => dispatch(setIsPlaying(false))}
                      ></i>
                    ) : (
                      <BsFillPlayFill
                        className={style['play']}
                        onClick={() => {
                          if (playList.id === item.id) {
                            dispatch(setIsPlaying(true));
                          } else {
                            runFunctions(item);
                          }
                        }}
                      />
                    )}
                  </div>
                  <div className={style['more']} ref={MoreRef}>
                    <CgMoreAlt
                      className={style['icon']}
                      onClick={() => {
                        if (!openPlaylist.state) {
                          setOpenPlaylist({ id: item.id, state: true });
                        } else {
                          setOpenPlaylist({ id: null, state: false });
                        }
                      }}
                    />
                  </div>
                </div>
                <img src={item?.avatar} alt="" />
                <h4>{item?.name}</h4>
                <p>{user?.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {isDelete.state && (
        <div className={style['deleteModal']}>
          <div className={style['deletePopup']}>
            <h3>Xóa Playlist</h3>
            <p>Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Bạn có muốn xóa?</p>
            <div className={style['action']}>
              <button onClick={() => setIsDelete({ id: null, state: false })}>
                Không
              </button>
              <button onClick={() => HandleDeletePlaylist(isDelete.id)}>Có</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPlayList;
