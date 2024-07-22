import NewMusicCharts from '../../components/NewMusicChart/NewMusicCharts';
import style from './MusicCharts.module.scss';
import clsx from 'clsx';

function MusicCharts() {
    return (
        <div className={style['MusicCharts']}>
            <NewMusicCharts />
        </div>
    );
}

export default MusicCharts;
