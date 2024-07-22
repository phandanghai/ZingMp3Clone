import clsx from 'clsx';
import style from './ArtistPages.module.scss';
import { useEffect, useState } from 'react';
import { ApiGetArtists } from '../../redux/ApiMusic';
import SortInfo from '../../components/DetalArtist/SortInfo/SortInfo';
import ListSongOfArtist from '../../components/DetalArtist/ListSongOfArtist/ListSongOfArtist';

function ArtistPages() {
    const [artist, setArtist] = useState({});
    useEffect(() => {
        const name = window.location.href.split('/')[4];
        console.log(name);
        ApiGetArtists([name]).then((data) => {
            setArtist(data[0].data);
        });
    }, [window]);
    return (
        <div className={style['ArtistPages']}>
            <SortInfo artist={artist} />
            <ListSongOfArtist detal={artist} />
        </div>
    );
}

export default ArtistPages;
