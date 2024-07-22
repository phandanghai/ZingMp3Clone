import style from './ConfirmPassword.module.scss';
import clsx from 'clsx';
import { FaChevronLeft } from 'react-icons/fa';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { BiHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import Checked from '../../../../public/checked.svg';
function ConfirmPassword(props) {
    function checkPasswordStrength(value) {
        // Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái
        const hasLetter = /[a-zA-Z]/.test(value);
        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự đặc biệt
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        // Kiểm tra xem mật khẩu có chứa ít nhất một chữ số
        const hasNumber = /\d/.test(value);

        // Kiểm tra xem mật khẩu có ít nhất 8 ký tự không
        const isLengthValid = value?.length >= 10;

        return {
            hasLetter,
            hasSpecialChar,
            hasNumber,
            isLengthValid,
        };
    }

    const HandleNextPage = () => {
        const data = checkPasswordStrength(props.user.password);
        let arr = [];
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                arr.push({ key: key, value: data[key] });
            }
        }
        const checked = arr.filter((item) => item.value === false);
        if (checked.length === 0) {
            console.log('chuyển trang !!!');
        }
    };
    const [show, setShow] = useState(false);
    return (
        <div className={style['ConfirmPassword']}>
            <div className={style['logo']}>
                <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="" />
            </div>
            <div className={style['content']}>
                <div className={style['line']}>
                    <div className={style['lineActive']}></div>
                </div>

                <div className={style['step']}>
                    <button>
                        <FaChevronLeft className={style['icon']} onClick={() => props.HandleSetPages(0)} />
                    </button>
                    <div className={style['title']}>
                        <p>Bước 1/3</p>
                        <span>Đặt mật khẩu</span>
                    </div>
                </div>
                <div className={style['passwordForm']}>
                    <h4>Mật khẩu</h4>
                    <input
                        value={props.user.password}
                        type={show ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => props.HandleSetUser({ password: e.target.value })}
                    />
                    {show ? (
                        <BiShow className={style['icon']} onClick={() => setShow(false)} />
                    ) : (
                        <BiHide className={style['icon']} onClick={() => setShow(true)} />
                    )}
                </div>

                <div className={style['checked']}>
                    <span>Mật khẩu của bạn phải có ít nhất</span>
                    <div>
                        {!checkPasswordStrength(props.user.password).hasLetter ? (
                            <RiCheckboxBlankCircleLine className={style['icon']} />
                        ) : (
                            <img src={Checked} className={style['icon']} />
                        )}
                        <p>1 chữ cái</p>
                    </div>
                    <div>
                        {!checkPasswordStrength(props.user.password).hasNumber ? (
                            <RiCheckboxBlankCircleLine className={style['icon']} />
                        ) : (
                            <img src={Checked} className={style['icon']} />
                        )}
                        <p>1 chữ số </p>
                    </div>
                    <div>
                        {!checkPasswordStrength(props.user.password).hasSpecialChar ? (
                            <RiCheckboxBlankCircleLine className={style['icon']} />
                        ) : (
                            <img src={Checked} className={style['icon']} />
                        )}
                        <p> ký tự đặc biệt (ví dụ: # ? ! &)</p>
                    </div>
                    <div>
                        {!checkPasswordStrength(props.user.password).isLengthValid ? (
                            <RiCheckboxBlankCircleLine className={style['icon']} />
                        ) : (
                            <img src={Checked} className={style['icon']} />
                        )}
                        <p>10 ký tự</p>
                    </div>
                </div>

                <button onClick={() => props.HandleSetPages(2)}>
                    <h4>Tiếp theo</h4>
                </button>
            </div>
        </div>
    );
}

export default ConfirmPassword;
