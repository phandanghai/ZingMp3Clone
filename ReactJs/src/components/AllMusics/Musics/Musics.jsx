import { FaPlay } from 'react-icons/fa6';
import style from './Musics.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ApiGetArtists } from '../../../redux/ApiMusic';
import { PiMicrophoneStageDuotone } from 'react-icons/pi';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineMoreHoriz } from 'react-icons/md';

function Musics() {
    const [artist, setArtist] = useState({});
    const [musics, setMusics] = useState([]);
    useEffect(() => {
        const art = window.location.href.split('/')[4];
        ApiGetArtists([art]).then((data) => {
            setArtist(data[0].data);
        });
    }, [window.location.href]);

    useEffect(() => {
        const padZero = (num) => {
            return (num < 10 ? '0' : '') + num;
        };
        const setTimes = (duration) => {
            const minutes = padZero(Math.floor(duration / 60));
            const seconds = padZero(Math.floor(duration % 60));
            return `${minutes}:${seconds}`;
        };
        if (artist.id) {
            const data = artist.sections[0].items.map((item) => {
                return {
                    ...item,
                    time: padZero(setTimes(item.duration)),
                };
            });

            setMusics(data);
        }
    }, [artist]);

    console.log(artist, musics);
    return (
        <div className={style['Musics']}>
            <div className={style['header']}>
                <h2>{`${artist?.name} - Tất Cả bài hát`}</h2>
                <div className={style['playIcon']}>
                    <FaPlay className={style['icon']} />
                </div>
            </div>

            <div className={style['listMusics']}>
                {musics?.map((item) => {
                    return (
                        <div key={item.encodeId} className={style['item']}>
                            <img src={item.thumbnail} alt="" />
                            <div className={style['descript']}>
                                <h4>{item.title}</h4>
                                <p className={style['artist']}>{item.artistsNames}</p>
                            </div>
                            <p className={style['title']}>{item.album?.title}</p>
                            <p className={style['time']}>{item.time}</p>

                            <div className={style['option']}>
                                <div className={style['play']}>
                                    <FaPlay className={style['icon']} />
                                </div>
                                <div className={style['list']}>
                                    <div className={style['mic']}>
                                        <PiMicrophoneStageDuotone className={style['icon']} />
                                    </div>
                                    <div className={style['like']}>
                                        <CiHeart className={style['icon']} />
                                    </div>
                                    <div className={style['more']}>
                                        <MdOutlineMoreHoriz className={style['icon']} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Musics;
