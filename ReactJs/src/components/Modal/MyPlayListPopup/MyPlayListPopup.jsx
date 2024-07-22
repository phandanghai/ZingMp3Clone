import style from './MyPlayListPopup.module.scss';
import clsx from 'clsx';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { FaShare } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { MdOutlineDelete } from 'react-icons/md';
function MyPlayListPopup(props) {
    const Menu = [
        {
            title: 'Thêm vào danh sách phát',
            icon: MdOutlinePlaylistAdd,
        },
        {
            title: 'Chia sẻ',
            icon: FaShare,
        },
        {
            title: 'Chỉnh sửa playlist',
            icon: GoPencil,
        },
        {
            title: 'Xóa playlist',
            icon: MdOutlineDelete,
        },
    ];
    return (
        <div className={style['MyPlayListPopup']}>
            <div className={style['before']} onClick={() => props.HandleClosePlayListPopup()}></div>
            {Menu.map((item) => {
                const Icon = item.icon;
                return (
                    <div className={style['item']} key={item.title}>
                        <Icon className={style['icon']} />
                        <h4>{item.title}</h4>
                    </div>
                );
            })}
        </div>
    );
}

export default MyPlayListPopup;
