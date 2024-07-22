import style from './Register.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import Google from '../../../../public/google.svg';
import Facebook from '../../../../public/facebook.svg';
import Apple from '../../../../public/apple.svg';
import { Link } from 'react-router-dom';
import { ApiCheckUser } from '../../../redux/ApiAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register(props) {
    const [isEmail, setIsEmail] = useState(true);
    const HandleCheckEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(props.user.email)) {
            ApiCheckUser(props.user.email).then((data) => {
                if (data.messages === 'new user') {
                    props.HandleSetPages(1);
                } else if (data.messages === 'existing user') {
                    toast.warning('Email đã tồn tại !!!', {
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
            });
        }
    };
    return (
        <div className={style['Register']}>
            <ToastContainer />
            <div className={style['logo']}>
                <img
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
                    alt=""
                />
            </div>

            <div className={style['content']}>
                <h2>Đăng ký để bắt đầu thưởng thức âm nhạc</h2>
                <div className={style['emailForm']}>
                    <span>Địa chỉ email</span>
                    <input
                        value={props.user.email}
                        type="text"
                        placeholder="name@gmail.com"
                        onChange={(e) => props.HandleSetUser({ email: e.target.value })}
                    />
                    {!isEmail && <p className={style['failed']}>Email không hợp lệ</p>}
                    <button onClick={HandleCheckEmail}>Tiếp theo</button>
                </div>
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

                <div className={style['login']}>
                    <h4>
                        Bạn đã có tài khoản tài khoản ? <Link style={{fontWeight : 500}}  to="/dang-nhap">Đăng nhập ngay</Link>
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default Register;
