import style from './PlayListHeading.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HandleEditArtistLink } from '../../AllFunctions/AllFunctions';
function PlayListHeading(props) {
  const [artists, setArtists] = useState([]);
  const [resize, setResize] = useState({
    width: null,
    height: null,
  });
  const type = window.location.href.split('/')[3];
  const user = useSelector((state) => state?.account?.account?.user);
  useEffect(() => {
    if (props?.info?.artists) {
      const data = props.info.artists.map((artist) => {
        return {
          name: artist.name,
          link: artist.link,
        };
      });
      setArtists(data);
    }
  }, [props.info]);

  const HandleEditLikedNumber = (number) => {
    if (Math.floor(number / 1000000) > 1) {
      return `${Math.floor(number / 1000000).toFixed(1)}M`;
    } else if (Math.floor(number / 1000000 < 1 && Math.floor(number) / 1000 > 1)) {
      return `${Math.floor(number / 1000)}k`;
    } else {
      return `${number}`;
    }
  };

  useEffect(() => {
    const HandleResize = () => {
      setResize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', HandleResize);
    return () => {
      window.removeEventListener('resize', HandleResize);
    };
  }, [window]);

  useEffect(() => {
    setResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return (
    <div className={style['PlayListHeading']}>
      {type === 'myplaylist' ? (
        <>
          <div className={style['image']}>
            <img src={props?.info?.avatar} alt="" />
          </div>
          <div className={style['info']}>
            <h1 style={{ marginBottom: 6 }}>{props?.info?.name}</h1>
            <p style={{ marginBottom: 4 }}>
              Tạo bởi: <b style={{ color: '#fff' }}>{user?.name}</b>
            </p>
            <p style={{ fontSize: 14 }}>
              {props?.info?.isPublic ? 'Công khai' : 'Riêng tư'}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={style['image']}>
            <img src={props?.info?.thumbnailM} alt="" />
          </div>
          <div className={style['info']}>
            <h1>{props.info?.title}</h1>
            <p className={style['update']}>Cập nhật : 13/05/2024 </p>
            <div className={style['arists']}>
              {artists.map((artist, index) => {
                return (
                  <Link key={index} to={`${HandleEditArtistLink(artist?.link)}`}>
                    <span className={style['singer']}>{artist?.name},</span>
                  </Link>
                );
              })}
            </div>
            <p className={style['likes']}>{`${HandleEditLikedNumber(
              props.info?.like,
            )} người yêu thích`}</p>
            {resize.width <= 1024 && (
              <div className={style['preface']}>
                <h2>Lời tựa</h2>{' '}
                <p>{`${props.info?.sortDescription?.substring(0, 80)} ...`}</p>
              </div>
            )}
            <button>
              <FaPlay className={style['icon']} style={{ marginRight: 4 }} />
              <h4>Phát tất cả</h4>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PlayListHeading;
