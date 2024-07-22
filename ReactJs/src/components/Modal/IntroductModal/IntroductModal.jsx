import style from './IntroductModal.module.scss';
import clsx from 'clsx';

function IntroductPopup({ HandleToggleIntroduct }) {
    return (
        <div className={style['IntroductPopup']}>
            <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg" alt="" />
            <h4>Giấy phép mạng xã hội: 157/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 24/4/2019</h4>
            <h4>
                Chủ quản: Công Ty Cổ Phần VNG Z06 Đường số 13, phường Tân Thuận Đông, quận 7, thành phố Hồ Chí Minh,
                Việt Nam
            </h4>

            <button onClick={() => HandleToggleIntroduct(false)}>
                <h4>Đóng</h4>
            </button>
        </div>
    );
}

export default IntroductPopup;
