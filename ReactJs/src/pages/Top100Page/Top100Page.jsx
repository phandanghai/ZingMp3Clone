import Top100 from '../../components/Top100/Top100';
import style from './Top100Page.module.scss';
import clsx from 'clsx';

function Top100Page() {
  return (
    <div className={style['Top100Page']}>
      <Top100 />
    </div>
  );
}

export default Top100Page;
