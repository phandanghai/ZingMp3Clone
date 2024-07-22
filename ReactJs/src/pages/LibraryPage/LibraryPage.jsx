import style from './LibraryPage.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Reccent from '../../components/Recent/Reccent';
import ListFavourites from '../../components/Library/ListFavourites/ListFavourites';
import { useSelector } from 'react-redux';
function LibraryPage() {
  const params = useSelector((state) => state.music.params);
  console.log(params);
  return (
    <div className={style['LibraryPage']}>
      {params === 'mymusic/danh-sach-yeu-thich' && <ListFavourites />}
      {params === 'mymusic/danh-sach-yeu-thich/album' && <ListFavourites />}
      {params === 'mymusic/danh-sach-yeu-thich/da-tai-len' && <ListFavourites />}
      {params === 'mymusic/nghe-gan-day' && <Reccent />}
    </div>
  );
}

export default LibraryPage;
