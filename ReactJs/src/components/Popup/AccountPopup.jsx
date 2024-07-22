import clsx from 'clsx';
import style from './AccountPopup.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GoUpload } from 'react-icons/go';
import { LuLogOut } from 'react-icons/lu';
import { useRef } from 'react';
import { ApiUpdateAvatar } from '../../redux/ApiAccount';
import { setAccount } from '../../redux/accountSlider';
import Cookie from 'js-cookie';
function AccountPopup(props) {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const HandleClick = (title) => {
    if (title === 'Đăng nhập') {
      window.location.href = '/dang-nhap';
    } else if (title === 'Đăng ký') {
      window.location.href = '/dang-ky';
    } else if (title === 'Nâng cấp VIP') {
      alert('Nâng cấp vip');
    } else if (title === 'Đăng xuất') {
      alert('Đăng xuất');
    }
  };

  const ChooseImage = (events) => {
    console.log(events.target.files[0]);
    const filesReader = new FileReader();
    filesReader.readAsDataURL(events.target.files[0]);
    filesReader.onloadend = (e) => {
      console.log(e.target.result);
      ApiUpdateAvatar(dispatch, { image: e.target.result }).then((result) => {
        if (result) {
          console.log(result);
          // window.location.reload();
        }
      });
    };
    filesReader.readAsDataURL(events.target.files[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('refreshToken');
    dispatch(setAccount(null));
    Cookie.remove('accessToken');
    window.location.reload();
  };
  const user = useSelector((state) => state.account.account);
  return (
    <div className={style['AccountPopup']}>
      <div
        className={style['hidden']}
        onClick={() => props.HandleCloseAccountPopup()}
      ></div>
      {user ? (
        <div className={style['account']}>
          <div className={style['info']}>
            <img src={user?.avatar} alt="" />
            <h3>{user?.name}</h3>
            <div className={style['type']}>Basic</div>
          </div>

          <div className={style['upgrade']}>Nâng cấp tài khoản</div>
          <h4 className={style['changeAvatar']}>
            <GoUpload className={style['upload']} />
            <p onClick={() => fileInputRef.current.click()}>Thay đổi avatar</p>
            <input type="file" ref={fileInputRef} onChange={(e) => ChooseImage(e)} />
          </h4>

          <div className={style['logoutUser']} onClick={() => handleLogout()}>
            <LuLogOut className={style['logoutIcon']} />
            <p>Đăng xuất</p>
          </div>
        </div>
      ) : (
        <div className={style['loginBox']}>
          <div
            className={clsx(style.item, style.login)}
            onClick={() => HandleClick('Đăng nhập')}
          >
            <span>Đăng nhập</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountPopup;
