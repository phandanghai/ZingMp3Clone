import { useEffect, useState } from 'react';
import style from './Artists.module.scss';
import clsx from 'clsx';
import { ApiGetArtists } from '../../redux/ApiMusic';
import { Link } from 'react-router-dom';
function Artists(props) {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (props.playList.artists) {
            const list = props.playList.artists.map((artist) => {
                return artist.alias;
            });
            ApiGetArtists(list).then((data) => {
                setArtists(data);
            });
        }
    }, [props.playList?.artists]);

    return (
        <div className={style['Artists']}>
            <h2>Nghệ Sĩ Tham Gia</h2>
            <div className={style['listArtists']}>
                {artists.map((artist, index) => {
                    return (
                        <div key={index} className={style['item']}>
                            <img src={artist.data.thumbnail} alt="" />
                            <Link to={`/nghe-si${artist.data.link}`}>{artist.data.name}</Link>
                            <p>{`${Math.floor(artist.data.follow / 1000)}k quan tâm`}</p>
                            <button>
                                <h4>Quan tâm</h4>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Artists;
