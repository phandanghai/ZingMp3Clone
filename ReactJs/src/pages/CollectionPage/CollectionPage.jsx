import Album from '../../components/Album/Album';
import Collection from '../../components/Collection/Collection';
import style from './CollectionPage.module.scss';
import clsx from 'clsx';

function CollectionPage() {
    return (
        <div className={style['CollectionPage']}>
            <Collection />
        </div>
    );
}

export default CollectionPage;
