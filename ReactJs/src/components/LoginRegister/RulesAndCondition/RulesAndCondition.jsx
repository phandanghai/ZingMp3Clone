import style from './RulesAndCondition.module.scss';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import { ApiRegister } from '../../../redux/ApiAccount';
import setAccount from '../../../redux/accountSlider';
function RulesAndCondition(props) {
    const dispatch = useDispatch();
    const [isMessages, setIsMessages] = useState(false);
    const [isShares, setIsShares] = useState(false);

    const HandleRegister = () => {
        const padZero = (num) => {
            return (num < 10 ? '0' : '') + num;
        };
        const convertToDateFormat = (dateObj) => {
            const months = padZero(dateObj.month);
            const dates = padZero(dateObj.date);
            return `${dates}/${months}/${dateObj.year}`;
        };
        if (isMessages && isShares) {
            console.log('gọi api ...');
            const formattedDate = convertToDateFormat(props.user.birthday);
            const data = {
                name: props.user.name,
                email: props.user.email,
                password: props.user.password,
                gender: props.user.gender,
                birthday: formattedDate,
            };
            ApiRegister(dispatch, data).then((result) => {
                if (result.status === 'success') {
                    window.location.href = '/dang-nhap';
                }
            });
        }
    };
    console.log(isMessages);
    return (
        <div className={style['RulesAndCondition']}>
            <div className={style['logo']}>
                <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="" />
            </div>
            <div className={style['content']}>
                <div className={style['line']}>
                    <div className={style['lineActive']}></div>
                </div>
                <div className={style['step']}>
                    <button>
                        <FaChevronLeft className={style['icon']} onClick={() => props.HandleSetPages(2)} />
                    </button>
                    <div className={style['title']}>
                        <p>Bước 3/3</p>
                        <span>Điều khoản và Điều kiện</span>
                    </div>
                </div>

                <div className={style['listCondition']}>
                    <div className={style['messages']}>
                        <input type="checkbox" checked={isMessages} onChange={() => setIsMessages(!isMessages)} />
                        <p>Tôi không muốn nhận tin nhắn tiếp thị từ ZingMp3</p>
                    </div>
                    <div className={style['shares']}>
                        <input type="checkbox" checked={isShares} onChange={() => setIsShares(!isShares)} />
                        <p>
                            Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung của Spotify cho mục đích tiếp
                            thị.
                        </p>
                    </div>
                </div>
                <button className={style['register']} onClick={() => HandleRegister()}>
                    <h4>Đăng ký</h4>
                </button>
            </div>
        </div>
    );
}

export default RulesAndCondition;
