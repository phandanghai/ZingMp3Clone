import Home from '../../components/Home/Home';
import style from './HomePages.module.scss';
import clsx from 'clsx';

function HomePages() {
    return (
        <div className={style['HomePages']}>
            <Home />
        </div>
    );
}

export default HomePages;
