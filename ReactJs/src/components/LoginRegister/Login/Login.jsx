import style from './Login.module.scss';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import Google from '../../../../public/google.svg';
import Facebook from '../../../../public/facebook.svg';
import Apple from '../../../../public/apple.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApiExample, ApiLogin } from '../../../redux/ApiAccount';
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleLogin = () => {
    const data = { email: email, password: password };
    ApiLogin(dispatch, data).then((data) => {
      localStorage.setItem('id', data.user.id);
      localStorage.setItem('name', data.user.name);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    });
  };

  return (
    <div className={style['Login']}>
      <div className={style['logo']}>
        <img
          src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
          alt=""
        />
      </div>
      <div className={style['content']}>
        <h1>Đăng nhập vào ZingMp3</h1>
        <div className={style['form']}>
          {['Email của người dùng', ' Mật khẩu'].map((title) => {
            return (
              <div key={title} className={style['item']}>
                <span>{title}</span>
                <input
                  type="text"
                  placeholder={title}
                  onChange={(e) => {
                    if (title === 'Email của người dùng') {
                      setEmail(e.target.value);
                    } else {
                      setPassword(e.target.value);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>

        <button className={style['btn-login']} onClick={HandleLogin}>
          Đăng nhập
        </button>

        <span className={style['forgot']}>Quên mật khẩu?</span>

        <span className={style['or']}>hoặc</span>
        <div className={style['social']}>
          <button>
            <img src={Google} alt="" />
            <h5>Đăng ký bằng Google</h5>
          </button>

          <button>
            <img src={Facebook} alt="" />
            <h5>Đăng ký bằng Facebook</h5>
          </button>

          <button>
            <img src={Apple} alt="" />
            <h5>Đăng ký bằng Apple</h5>
          </button>
        </div>

        <div className={style['register']}>
          <h4>
            Bạn chưa có tài khoản tài khoản ?{' '}
            <Link style={{ fontWeight: 500 }} to="/dang-ky">
              Đăng ký ngay
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
