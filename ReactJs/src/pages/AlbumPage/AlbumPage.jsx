import Album from '../../components/Album/Album';
import style from './AlbumPage.module.scss';
import clsx from 'clsx';

function AlbumPage() {
    return (
        <div className={style['AlbumPage']}>
            <Album />
        </div>
    );
}

export default AlbumPage;
