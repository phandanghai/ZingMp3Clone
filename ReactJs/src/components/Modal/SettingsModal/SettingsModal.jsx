import style from './SettingsModal.module.scss';
import clsx from 'clsx';
import playIcon from '../../../../public/playIcon.svg';
import layoutIcon from '../../../../public/layoutIcon.svg';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
function SettingsModal({ HandleOpenSettingModal, HandleCloseLayoutPopup, HandleToggleIntroduct }) {
    const Settings = [
        {
            title: 'Trình phát nhạc',
            icon: playIcon,
            type: 'img',
        },
        {
            title: 'Giao diện',
            icon: layoutIcon,
            type: 'img',
        },
        {
            title: 'Giới thiệu',
            type: 'icon',
            icon: IoInformationCircleOutline,
        },
        {
            title: 'Điều khoản sử dụng',
            type: 'icon',
            icon: MdOutlinePrivacyTip,
        },
        {
            title: 'Chỉnh sách bảo mật',
            type: 'icon',
            icon: MdOutlinePrivacyTip,
        },
        {
            title: 'Báo cáo vi phạm bản quyền',
            type: 'icon',
            icon: FiPhone,
        },
        {
            title: 'Quảng cáo',
            type: 'icon',
            icon: FiPhone,
        },
        {
            title: 'Liên hệ',
            type: 'icon',
            icon: FiPhone,
        },
    ];

    return (
        <div className={style['SettingsModal']}>
            <div className={style['before']} onClick={() => HandleOpenSettingModal(false)}></div>
            {Settings.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        className={style['item']}
                        key={item.title}
                        onClick={() => {
                            if (item.title === 'Giao diện') {
                                HandleCloseLayoutPopup();
                                HandleOpenSettingModal(false);
                            } else if (item.title === 'Giới thiệu') {
                                HandleToggleIntroduct(true);
                                HandleOpenSettingModal(false);
                            }
                        }}
                    >
                        {item.type === 'img' ? <img src={item.icon} alt="" /> : <Icon className={style['icon']} />}
                        <h4>{item.title}</h4>
                    </div>
                );
            })}
        </div>
    );
}

export default SettingsModal;
