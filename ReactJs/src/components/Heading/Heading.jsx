import style from './Heading.module.scss';
import clsx from 'clsx';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { IoSearchSharp } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { setSettingsModal } from '../../redux/musicSlider';
import { useEffect, useRef, useState } from 'react';
import { ApiSearchMusic } from '../../redux/ApiMusic';
import { Link } from 'react-router-dom';
import { setIsAccountPopup, setIsLogin } from '../../redux/stateSlider';
import AccountPopup from '../Popup/AccountPopup';
function Heading({ HandleOpenSettingModal }) {
  const boxSearch = useRef();
  const [search, setSearch] = useState(null);
  const user = useSelector((state) => state.account.account);
  const dispatch = useDispatch();
  const settingsModal = useSelector((state) => state.music.settingsModal);

  useEffect(() => {
    const HandleSearchData = () => {
      const searchParams = new URLSearchParams({ search: search });
      window.location.href = `/ket-qua-tim-kiem/${search}?${searchParams.toString()}`;
    };
    if (boxSearch.current && search) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          HandleSearchData();
        }
      });
      return () => {
        document.removeEventListener('keydown', HandleSearchData);
      };
    }
  }, [search]);

  return (
    <div className={style['Heading']}>
      <div className={style['back']}>
        <FaArrowLeftLong className={style['icon']} />
        <FaArrowRightLong className={style['icon']} />
      </div>
      <div className={style['SearchBox']}>
        <IoSearchSharp className={style['icon']} />
        <input
          ref={boxSearch}
          type="text"
          placeholder="Tìm kiếm bài hát,nghê sĩ,lời bài hát ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={style['account']}>
        <div className={style['settings']} onClick={() => HandleOpenSettingModal(true)}>
          <CiSettings className={style['icon']} />
        </div>
        <div
          className={style['avatar']}
          onClick={() => dispatch(setIsAccountPopup(true))}
        >
          {user ? (
            <img src={user?.avatar} alt="" />
          ) : (
            <img
              src={
                'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.10.30/static/media/user-default.3ff115bb.png'
              }
              alt
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Heading;
