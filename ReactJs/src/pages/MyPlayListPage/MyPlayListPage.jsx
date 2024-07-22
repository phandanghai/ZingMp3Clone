import MyPlayList from '../../components/MyPlayList/MyPlayList';
import style from './MyPlayListPage.module.scss';
import clsx from 'clsx';

function MyPlayListPage() {
    return (
        <div className={style['MyPlayListPage']}>
            <MyPlayList />
        </div>
    );
}

export default MyPlayListPage;
