import MV from '../../components/MV/MV';
import style from './MVPage.module.scss';
import clsx from 'clsx';

function MVPage() {
    return (
        <div className={style['MVPage']}>
            <MV />
        </div>
    );
}

export default MVPage;
