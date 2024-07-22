import Search from '../../components/Search/Search';
import style from './SearchPages.module.scss';
import clsx from 'clsx';

function SearchPages() {
  return (
    <div className={style['SearchPages']}>
      <Search />
    </div>
  );
}

export default SearchPages;
