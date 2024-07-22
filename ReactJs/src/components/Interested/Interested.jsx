import { lazy, useEffect, useState } from 'react';
import style from './Interested.module.scss';
import clsx from 'clsx';
import { ApiGetDetalArtist } from '../../redux/ApiMusic';

function Interested(props) {
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        if (props.playList) {
            const data = props.playList?.artists?.map((artist) => artist.id);
            ApiGetDetalArtist(data).then((data) => {
                setAlbums(data);
            });
        }
    }, [props.playList]);

    return (
        <div className={style['Interested']}>
            <h2>Có thể bạn quan tâm</h2>
            <div className={style['listArtist']}>
                {albums?.map((album, index) => {
                    return (
                        <div key={index} className={style['item']}>
                            <img src={album.data.items[0].thumbnail} alt="" />
                            <h4>{album.data.items[0].title}</h4>
                            <h5>{album.data.items[0].artistsNames}</h5>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Interested;
