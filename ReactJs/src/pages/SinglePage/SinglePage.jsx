import Single from '../../components/Single/Single';
import style from './SinglePage.module.scss';
import clsx from 'clsx';

function SinglePage() {
    return (
        <div className={style['SinglePage']}>
            <Single />
        </div>
    );
}

export default SinglePage;
