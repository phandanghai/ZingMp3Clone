import Musics from '../../components/AllMusics/Musics/Musics';
import style from './AllMusicPage.module.scss';
import clsx from 'clsx';

function AllMusicPage() {
    return (
        <div className={style['AllMusicPage']}>
            <Musics />
        </div>
    );
}

export default AllMusicPage;
