import { useEffect, useState } from 'react';
import style from './Album.module.scss';
import clsx from 'clsx';
import { ApiGetArtists } from '../../redux/ApiMusic';

function Album() {
    const [album, setAlbum] = useState([]);
    const [artist, setArtists] = useState([]);
    useEffect(() => {
        const art = window.location.href.split('/')[4];
        ApiGetArtists([art]).then((data) => {
            console.log(data[0].data);
            setArtists(data[0].data);
            data[0].data.sections?.map((section) => {
                if (section.title === 'Album') {
                    setAlbum(section.items);
                }
            });
        });
    }, [window.location.href]);

    console.log(album);
    return (
        <div className={style['Album']}>
            <div className={style['header']}>
                <h2>{`${artist?.name} - Tất Cả Single & Ep`}</h2>
            </div>

            <div className={style['listSingle']}>
                {album?.map((item) => {
                    return (
                        <div key={item.encodeId} className={style['item']}>
                            <img src={item.thumbnail} alt="" />
                            <h3>{`${item.title.substring(0, 22)}...`}</h3>
                            <p>{item.releaseDate.trim().length === 4 ? item.releaseDate : item.releaseDate.slice(3)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Album;
