import style from './Layout.module.scss';
import clsx from 'clsx';
import { IoCloseOutline } from 'react-icons/io5';
function LayoutPopup({ HandleCloseLayoutPopup }) {
    const Dynamics = [
        {
            title: 'London',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/London-thumb.png',
        },
        {
            title: 'Sáng Tối',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-light-dark-1.jpg',
        },
        {
            title: 'Xanh da trời',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-blue.jpg',
        },
        {
            title: 'Hồng',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-pink.jpg',
        },
        {
            title: 'Nâu',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dynamic-brown.jpg',
        },
    ];
    const Topics = [
        {
            title: 'XONE',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-thumbn.jpg',
        },
        {
            title: 'Zimg Music Awards',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/zma.jpg',
        },
        {
            title: 'Thapsd Elffel',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/eiffel.jpg',
        },
    ];
    const Artists = [
        {
            title: 'Jack',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jack.jpg',
        },
        {
            title: 'IU',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/iu.jpg',
        },
        {
            title: 'Ji Chang Hook',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/ji-chang-wook.jpg',
        },
        {
            title: 'Lisa',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/lisa.jpg',
        },
        {
            title: 'Jenie Kim',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jennie.jpg',
        },
        {
            title: 'Jisoo',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jisoo.jpg',
        },
        {
            title: 'Rose',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/rose.jpg',
        },
    ];
    const DarkTheme = [
        {
            title: 'Tối',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dark.jpg',
        },
        {
            title: 'Tím',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/purple.jpg',
        },
        {
            title: 'Xanh đậm',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue.jpg',
        },
        {
            title: 'Xanh biển',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue-light.jpg',
        },
        {
            tiutle: 'Xanh lá',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green.jpg',
        },
        {
            title: 'Nâu',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/brown.jpg',
        },
        {
            title: 'Hồng',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink.jpg',
        },
        {
            title: 'Đỏ',
            img: '<img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/red.jpg" alt="">',
        },
    ];

    const LightTheme = [
        {
            title: 'Sáng',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/light.jpg',
        },
        {
            title: 'Xám',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/gray.jpg',
        },
        {
            title: 'Xanh nhạt',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green-light.jpg',
        },
        {
            title: 'Hồng cánh sem',
            img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink-light.jpg',
        },
    ];
    return (
        <div className={style['LayoutPopup']}>
            <div className={style['header']}>
                <h1>Giao diện</h1>
                <IoCloseOutline className={style['icon']} onClick={HandleCloseLayoutPopup} />
            </div>

            <div className={style['themes']}>
                <div className={style['dynamicTheme']}>
                    <h2>Dynamic</h2>
                    <div className={style['theme']}>
                        {Dynamics.map((item) => {
                            return (
                                <div className={style['item']} key={item.title}>
                                    <img src={item.img} alt="" />
                                    <h4>{item.title}</h4>
                                    <div className={style['option']}>
                                        <button>Áp dụng</button>
                                        <button>Xem trước</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={style['topicTheme']}>
                    <h2>Chủ đề</h2>
                    <div className={style['theme']}>
                        {Topics.map((item) => {
                            return (
                                <div className={style['item']} key={item.title}>
                                    <img src={item.img} alt="" />
                                    <h4>{item.title}</h4>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={style['artistTheme']}>
                    <h2>Nghê sĩ</h2>
                    <div className={style['theme']}>
                        {Artists.map((item) => {
                            return (
                                <div className={style['item']} key={item.title}>
                                    <img src={item.img} alt="" />
                                    <h4>{item.title}</h4>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={style['darkTheme']}>
                    <h2>Màu Tối</h2>
                    <div className={style['theme']}>
                        {DarkTheme.map((item) => {
                            return (
                                <div className={style['item']} key={item.title}>
                                    <img src={item.img} alt="" />
                                    <h4>{item.title}</h4>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={style['lightTheme']}>
                    <h2>Màu Sáng</h2>
                    <div className={style['theme']}>
                        {LightTheme.map((item) => {
                            return (
                                <div className={style['item']} key={item.title}>
                                    <img src={item.img} alt="" />
                                    <h4>{item.title}</h4>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutPopup;
