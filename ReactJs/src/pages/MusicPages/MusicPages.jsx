import DetalMusic from '../../components/Music/DetalMusic/DetalMusic';
import SortInfoMusic from '../../components/Music/SortInfo/SortInfoMusic';
import style from './MusicPages.module.scss';
import clsx from 'clsx';

function MusicPage() {
    return (
        <div className={style['MusicPages']}>
            <SortInfoMusic />
            <DetalMusic />
        </div>
    );
}

export default MusicPage;
