import { useEffect, useState } from 'react';
import style from './MV.module.scss';
import clsx from 'clsx';
import { ApiGetArtists } from '../../redux/ApiMusic';

function MV() {
    const [mv, setMV] = useState([]);
    const [artist, setArtist] = useState([]);
    useEffect(() => {
        const art = window.location.href.split('/')[4];
        ApiGetArtists([art]).then((data) => {
            console.log(data[0].data);
            setArtist(data[0].data);
            data[0].data.sections?.map((section) => {
                if (section.title === 'MV') {
                    setMV(section.items);
                }
            });
        });
    }, [window.location.href]);

    console.log(mv);
    return (
        <div className={style['MV']}>
            <div className={style['header']}>
                <h2>{`${artist?.name} - Tất Cả MV`}</h2>
            </div>

            <div className={style['listSingle']}>
                {mv?.map((item) => {
                    return (
                        <div key={item.encodeId} className={style['item']}>
                            <img src={item.thumbnail} alt="" />
                            <h3>{item.title}</h3>
                            <p>{item.artistsNames}</p>
                            <img className={style['artist']} src={item.artist.thumbnail} alt="" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MV;
