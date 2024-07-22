import Topic from '../../components/Topic/Topic';
import style from './TopicPage.module.scss';
import clsx from 'clsx';

function TopicPage() {
    return (
        <div className={style['TopicPage']}>
            <Topic />
        </div>
    );
}

export default TopicPage;
