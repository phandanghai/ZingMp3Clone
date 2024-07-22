import style from './Menu.module.scss';
import clsx from 'clsx';
import Library from '../../../public/library.svg';
import Discover from '../../../public/discover.svg';
import ZingChat from '../../../public/zingchat.svg';
import Radio from '../../../public/radio.svg';
import TopMusic from '../../../public/topMusic.svg';
import Top from '../../../public/top.svg';
import Classify from '../../../public/classify.svg';
import Create from '../../../public/create.svg';
import Recent from '../../../public/recent.svg';
import PlayList from '../../../public/playlist.svg';
import Download from '../../../public/download.svg';
import Favourite from '../../../public/favourites.svg';
import Album from '../../../public/album.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setParams } from '../../redux/musicSlider';
import { setIsNewPlayListPopup } from '../../redux/stateSlider';
function Menu() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const songs = useSelector((state) => state.music.song);
  const listMenu = [
    { title: 'Thư Viện', img: Library, link: 'mymusic' },
    { title: 'Khám phá', img: Discover, link: '' },
    { title: '#zingchat', img: ZingChat, link: '' },
    { title: 'Radio', img: Radio, link: '' },
  ];

  const Category = [
    { title: 'BXH Nhạc mới', img: TopMusic, link: 'moi-phat-hanh', isLogin: false },
    {
      title: 'Chủ đề và Thể loại',
      img: Classify,
      link: 'chu-de&&the-loai',
      isLogin: false,
    },
    { title: 'Top 100', img: Top, link: 'top-100', isLogin: false },
    { title: 'Nghe gần đây', img: Recent, link: 'mymusic/nghe-gan-day', isLogin: true },
    {
      title: 'Bài hát yêu thích',
      img: Favourite,
      link: 'mymusic/danh-sach-yeu-thich',
      isLogin: true,
    },
    { title: 'Playlist', img: PlayList, link: 'mymusic/myplaylist', isLogin: true },
    {
      title: 'Album',
      img: Album,
      link: 'mymusic/danh-sach-yeu-thich/album',
      isLogin: true,
    },
    {
      title: 'Đã tải lên',
      link: 'mymusic/danh-sach-yeu-thich/da-tai-len',
      img: Download,
      isLogin: true,
    },
  ];

  return (
    <div className={style['Menu']}>
      <Link to={'/'}>
        <div className={style['logo']}></div>
      </Link>
      <div className={style['logoMobile']}></div>
      <div className={style['list-menu']}>
        {listMenu.map((menu) => {
          return (
            <Link
              to={`/${menu.link}`}
              key={menu.title}
              className={
                active === menu.title ? clsx(style.item, style.active) : style.item
              }
              style={menu.title === 'Đã tải lên' ? { cursor: 'not-allowed' } : null}
              onClick={() => dispatch(setParams(menu.link))}
            >
              <img src={menu.img} alt="" />
              <h4 style={active === menu.title ? { color: '#fff' } : null}>
                {menu.title}
              </h4>
            </Link>
          );
        })}
      </div>

      <div
        className={style['list-cate']}
        style={
          songs.id
            ? {
                height: 150,
              }
            : null
        }
      >
        <div>
          {Category.map((menu) => {
            return (
              <Link
                to={`/${menu.link}`}
                key={menu.title}
                className={
                  !menu.isLogin
                    ? clsx(style['item'])
                    : menu.isLogin && localStorage.getItem('id')
                    ? clsx(style['item'])
                    : clsx(style['none'])
                }
                onClick={() => dispatch(setParams(menu.link))}
                style={
                  active === menu.title
                    ? {
                        borderLeft: '4px solid #c273ed',
                        backgroundColor: '#352e3d',
                      }
                    : null
                }
              >
                <img src={menu.img} alt="" />
                <h4>{menu.title}</h4>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className={style['create-playlist']}
        style={songs.id ? { bottom: 80 } : null}
        onClick={() => dispatch(setIsNewPlayListPopup(true))}
      >
        <img src={Create} alt="" />
        <h4>Tạo playlist mới</h4>
      </div>
    </div>
  );
}

export default Menu;
