import { useEffect, useState } from 'react';
import style from './PlaylistPages.module.scss';
import clsx from 'clsx';
import { ApiGetListMusicInfo, ApiGetPlayList } from '../../redux/ApiMusic';
import PlayListHeading from '../../components/PlayListHeading/PlayListHeading';
import ShowPlaylist from '../../components/ShowPlaylist/ShowPlaylist';
import Artists from '../../components/Artists/Artists';
import Interested from '../../components/Interested/Interested';
import { useSelector } from 'react-redux';
import { ApiGetDetalMyPlayList } from '../../redux/ApiAccount';
function PlayListPages() {
    const [playList, setPlayList] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState();
    const [info, setInfo] = useState({});
    const type = window.location.href.split('/')[3];
    useEffect(() => {
        if (
            window.location.href.split('/')[3] === 'album' ||
            window.location.href.split('/')[3] === 'playlist'
        ) {
            ApiGetPlayList({ id: window.location.href.split('/')[5].slice(0, -5) }).then((data) => {
                const listIds = data.data.data.song.items.map((item) => item.encodeId);
                ApiGetPlayList({ id: window.location.href.split('/')[5].slice(0, -5) }).then(
                    (data) => {
                        setInfo(data.data.data);
                    },
                );
                ApiGetListMusicInfo(listIds).then((data) => {
                    setPlayList(data);
                });
            });
        } else if (window.location.href.split('/')[3] === 'myplaylist') {
            ApiGetDetalMyPlayList({ id: window.location.href.split('/')[5].slice(0, -5) }).then(
                (data) => {
                    setInfo(data.myPlayList);
                    setPlayList(data.myPlayList);
                },
            );
        }
    }, []);

    const HandleSetCurrentPlaylist = (value) => {
        console.log(value);
        setCurrentPlaylist(value);
    };

    useEffect(() => {
        if (currentPlaylist) {
            if (currentPlaylist.split('/'[0] === 'album') && currentPlaylist.split('/'[3])) {
                ApiGetPlayList({ id: currentPlaylist.split('/')[3].slice(0, -5) }).then((data) => {
                    const listIds = data.data.data.song.items.map((item) => item.encodeId);
                    ApiGetPlayList({
                        id: currentPlaylist.split('/')[3].slice(0, -5),
                    }).then((data) => {
                        console.log(data);
                        setInfo(data.data.data);
                    });
                    ApiGetListMusicInfo(listIds).then((data) => {
                        setPlayList(data);
                    });
                });
            }
        }
    }, [currentPlaylist]);

    const PlayList = useSelector((state) => state.music.playList);
    return (
        <div className={style['PlayListPages']}>
            <PlayListHeading info={info} />
            <ShowPlaylist
                info={info}
                playList={playList}
                HandleSetCurrentPlaylist={HandleSetCurrentPlaylist}
            />
        </div>
    );
}

export default PlayListPages;
