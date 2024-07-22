import clsx from 'clsx';
import style from './LoginPopup.module.scss';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { setIsLoginPopup } from '../../../redux/stateSlider';
function LoginPopup() {
  const dispatch = useDispatch();
  return (
    <div className={style['LoginPopup']}>
      <h3>Bạn cần đăng ký tài khoản Vip để nghe bài này!!!</h3>
      <IoMdClose
        className={style['close']}
        onClick={() => dispatch(setIsLoginPopup(false))}
      />
    </div>
  );
}

export default LoginPopup;
