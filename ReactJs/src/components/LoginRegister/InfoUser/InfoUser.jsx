import style from './InfoUser.module.scss';
import clsx from 'clsx';
import { FaChevronLeft } from 'react-icons/fa';
function InfoUser(props) {
    const HandleNextPage = () => {
        if (
            props.user.name &&
            props.user.birthday.date &&
            props.user.birthday.month &&
            props.user.birthday.year &&
            props.user.gender
        ) {
            props.HandleSetPages(3);
        }
    };
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    return (
        <div className={style['InfoUser']}>
            <div className={style['logo']}>
                <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="" />
            </div>

            <div className={style['content']}>
                <div className={style['line']}>
                    <div className={style['lineActive']}></div>
                </div>

                <div className={style['step']}>
                    <button>
                        <FaChevronLeft className={style['icon']} onClick={() => props.HandleSetPages(1)} />
                    </button>
                    <div className={style['title']}>
                        <p>Bước 2/3</p>
                        <span>Giới thiệu thông tin về bản thân bạn</span>
                    </div>
                </div>
                <div className={style['nameForm']}>
                    <span>Tên</span>
                    <p>Tên này sẽ xuất hiện trên hồ sơ của bạn</p>
                    <input
                        value={props.user.name}
                        type="text"
                        placeholder="Nhập tên của bạn ..."
                        onChange={(e) => props.HandleSetUser({ name: e.target.value })}
                    />
                </div>

                <div className={style['birthdayForm']}>
                    <span>Ngày sinh</span>
                    <p>Ngày sinh này sẽ xuất hiện trên hồ sơ của bạn</p>
                    <div className={style['box']}>
                        <input
                            type="text"
                            className={clsx(style.form, style.date)}
                            placeholder="dd"
                            onChange={(e) =>
                                props.HandleSetUser({
                                    birthday: {
                                        ...props.user.birthday,
                                        date: e.target.value,
                                    },
                                })
                            }
                        />
                        <select
                            name=""
                            id=""
                            className={clsx(style.form, style.month)}
                            onChange={(e) => {
                                props.HandleSetUser({
                                    birthday: {
                                        ...props.user.birthday,
                                        month: e.target.value.slice(6),
                                    },
                                });
                            }}
                        >
                            {months.map((month) => {
                                return <option key={month}>{`Tháng ${month}`}</option>;
                            })}
                        </select>
                        <input
                            type="text"
                            className={clsx(style.form, style.year)}
                            placeholder="yyyy"
                            onChange={(e) =>
                                props.HandleSetUser({
                                    birthday: {
                                        ...props.user.birthday,
                                        year: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                </div>

                <div className={style['genderForm']}>
                    <span>Giới tính</span>
                    <p> Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất và quảng cáo phù hợp với bạn.</p>
                    <div className={style['select']}>
                        {['Nam', 'Nữ', 'Không phân biệt'].map((gender) => {
                            return (
                                <div key={gender}>
                                    <input
                                        type="radio"
                                        checked={props.user.gender === gender}
                                        onChange={(e) => props.HandleSetUser({ gender: gender })}
                                    />
                                    <label>{gender}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button className={style['nextPage']}>
                    <h4 onClick={HandleNextPage}>Tiếp theo</h4>
                </button>
            </div>
        </div>
    );
}

export default InfoUser;
