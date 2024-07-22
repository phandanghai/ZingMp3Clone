import { useEffect, useState } from 'react';
import style from './SortInfoMusic.module.scss';
import clsx from 'clsx';
import { ApiGetSongInfo } from '../../../redux/ApiMusic';
import { FaPlay } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { FiMoreHorizontal } from 'react-icons/fi';
function SortInfoMusic() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const id = window.location.href.split('/')[5];
    ApiGetSongInfo({ id: id.slice(0, -5) }).then((data) => {
      setInfo(data.data);
    });
  }, []);
  return (
    <div className={style['SortInfoMusic']}>
      <div className={style['image']}>
        <img src={info?.thumbnailM} alt="" />
      </div>
      <div className={style['info']}>
        <h2>{info?.title}</h2>
        <p>{`${info?.artistsNames} * 2024`}</p>
        <p>534 người thích</p>

        <button>
          <FaPlay className={style['icon']} />
          <h4>Phát tất cả</h4>
        </button>

        <div className={style['action']}>
          <div className={style['love']}>
            <CiHeart className={style['icon']} />
          </div>

          <div className={style['more']}>
            <FiMoreHorizontal className={style['icon']} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortInfoMusic;
