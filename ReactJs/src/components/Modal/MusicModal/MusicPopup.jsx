import style from './MusicPopup.module.scss';
import clsx from 'clsx';
import { CiHeart } from 'react-icons/ci';
import { TbHeadphones } from 'react-icons/tb';
import { MdOutlineFileDownload } from 'react-icons/md';
import { MdOutlineLyrics } from 'react-icons/md';
import { LuBan } from 'react-icons/lu';
import { PiPlayLight } from 'react-icons/pi';
import { TbPlaylistAdd } from 'react-icons/tb';
import { IoIosLink } from 'react-icons/io';
import { PiShareFatLight } from 'react-icons/pi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoIosMore } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { ApiGetPlayList } from '../../../redux/ApiMusic';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayList, setSong, setMusicPopup } from '../../../redux/musicSlider';
import { ToastContainer, toast } from 'react-toastify';
import {
  ApiAddMusicOnPlaylist,
  ApiDeletePlayList,
  ApiGetDetalMyPlayList,
  ApiGetMyPlayList,
} from '../../../redux/ApiAccount';

function MusicPopup(props) {
  console.log(props.type);
  const dispatch = useDispatch();
  const song = useSelector((state) => state.music.song);
  const playlist = useSelector((state) => state.music.playList);
  const EditTitleForMusic = (inputValue) => {
    if (inputValue?.split(' ').length > 6) {
      return `${inputValue.split(' ').slice(0, 6).join(' ')}...`;
    } else {
      return inputValue;
    }
  };

  const setNumber = (number) => {
    if (props?.music?.like) {
      if (Math.floor(props.music.like / 1000000) > 0) {
        return `${Math.floor(props.music.like / 1000000)}M`;
      }
      if (
        Math.floor(props.music.like / 1000000) === 0 &&
        Math.floor(props.music.like / 1000) > 1
      ) {
        return `${Math.floor(props.music.like / 1000)}K`;
      }
      if (Math.floor(props.music.like / 1000) === 0) {
        return Math.floor(props.music.like);
      }
    }
  };
  const Actions = [
    {
      title: 'Tải xuống',
      icon: MdOutlineFileDownload,
    },
    {
      title: 'Lời bài hát',
      icon: MdOutlineLyrics,
    },
    {
      title: 'Chặn',
      icon: LuBan,
    },
  ];
  const Menus = [
    {
      title: 'Thêm vào danh sách phát',
      icon: PiPlayLight,
    },
    {
      title: 'Phát tiếp theo',
      icon: TbPlaylistAdd,
    },
    {
      title: 'Phát nôi dung tương tự',
      icon: TbPlaylistAdd,
    },
    {
      title: 'Sao chép link',
      icon: IoIosLink,
    },
    {
      title: 'Chia sẻ',
      icon: PiShareFatLight,
    },
  ];
  const musicPopup = useSelector((state) => state.music.musicPopup);

  const AddEncodeId = (id) => {
    ApiGetPlayList({ id: window.location.href.split('/')[5].slice(0, -5) }).then(
      (data) => {
        const listMusics = data?.data?.data?.song?.items?.map((item) => {
          return item.encodeId;
        });
        dispatch(
          setPlayList({
            id: window.location.href.split('/')[5].slice(0, -5),
            data: listMusics,
            index: id,
          }),
        );
        dispatch(setSong({ id: id, state: true }));
      },
    );
  };

  const AddNextMusic = (id) => {
    const index = playlist.data.findIndex((musicId) => musicId === id);
    if (index !== -1) {
      dispatch(
        setPlayList({
          id: playlist.id,
          data: playlist.data,
          index: index,
        }),
      );
      dispatch(setSong({ id: id, state: true }));
    } else {
      console.log(props.idPlaylist, props.music.encodeId);
      ApiGetPlayList({ id: window.location.href.split('/')[5].slice(0, -5) }).then(
        (data) => {
          const listMusics = data.data.data.song.items.map((item) => {
            return item.encodeId;
          });

          const index = listMusics.findIndex((idMusic) => idMusic === id);
          dispatch(
            setPlayList({
              id: props.idPlaylist,
              data: listMusics,
              index: index,
            }),
          );

          dispatch(setSong({ id: id, state: true }));
        },
      );
    }
  };

  const HandleClickActions = (title, id) => {
    console.log(title, id);
    if (title === 'Thêm vào danh sách phát') {
      dispatch(
        setPlayList({
          id: playlist.id,
          data: [...playlist.data, id],
          index: playlist.index,
        }),
        dispatch(setMusicPopup({ state: false, id: null, type: null })),
      );
    }
    if (title === 'Phát tiếp theo' || title === 'Phát nôi dung tương tự') {
      if (playlist.data.includes(id)) {
        console.log('phát bài trong playlist');
        const next = playlist.data.indexOf(id);
        dispatch(
          setPlayList({
            id: playlist.id,
            index: next,
            data: playlist.data,
          }),
        );
        dispatch(setSong({ id: id, state: true }));
        dispatch(setMusicPopup({ state: false, id: null, type: null }));
      } else {
        const curentIndex = playlist.data.indexOf(song.id);
        let data = [...playlist.data];
        const newData = data.splice(curentIndex + 1, 0, id);
        dispatch(
          setPlayList({
            id: playlist.id,
            index: playlist.index,
            data: data,
          }),
        );
        dispatch(setMusicPopup({ state: false, id: null, type: null }));
      }
    }
  };

  const HandleDeleteMusicInPlaylist = () => {
    console.log({
      idPlaylist: window.location.href.split('/')[5],
      idMusic: props.music.encodeId,
    });
    ApiGetDetalMyPlayList({ id: window.location.href.split('/')[5].slice(0, -5) }).then(
      (data) => {
        console.log(data);
        ApiAddMusicOnPlaylist({
          id: window.location.href.split('/')[5].slice(0, -5),
          myPlaylist: data.myPlayList?.listIdMusics.filter(
            (id) => id !== props.music.encodeId,
          ),
        }).then((data) => {
          window.location.reload();
        });
      },
    );
  };
  return (
    <div
      className={style['MusicPopup']}
      style={
        window.location.href.split('/')[3] !== 'myplaylist'
          ? { height: 335 }
          : { height: 368 }
      }
    >
      <ToastContainer />
      {(musicPopup.type === 'playlist' ||
        musicPopup.type === 'modal' ||
        musicPopup.type === 'recents' ||
        musicPopup.type === 'newMusic' ||
        musicPopup.type === 'artist' ||
        musicPopup.type === 'music') && (
        <div
          className={style['before']}
          style={
            musicPopup.type === 'artist'
              ? { WebkitFilter: 'invert(100%)' }
              : { WebkitFilter: 'invert(0%)' }
          }
          onClick={() => props.HandleClosePopup()}
        ></div>
      )}
      {musicPopup.type === 'songplayer' && (
        <div className={style['bottom']} onClick={() => props.HandleClosePopup()}></div>
      )}
      {musicPopup.type === 'newReleases' && (
        <div className={style['right']} onClick={() => props.HandleClosePopup()}></div>
      )}
      <div className={style['header']}>
        <div className={style['image']}>
          <img className={style['img']} src={props?.music?.thumbnailM} alt="" />
        </div>
        <div className={style['info']}>
          <h4>{EditTitleForMusic(props?.music?.title)}</h4>
          <div className={style['like']}>
            <CiHeart
              className={style['icon']}
              style={
                props.onModal
                  ? { WebkitFilter: 'invert(100%)' }
                  : { WebkitFilter: 'invert(0%)' }
              }
            />
            <p>{`${setNumber(props?.music?.like)}`}</p>
          </div>
          <div className={style['listen']}>
            <TbHeadphones
              className={style['icon']}
              style={
                props.onModal
                  ? { WebkitFilter: 'invert(100%)' }
                  : { WebkitFilter: 'invert(0%)' }
              }
            />
            <p>{`${Math.floor(props?.music?.listen / 100)}K`}</p>
          </div>
        </div>
      </div>
      <div className={style['middle']}>
        {Actions.map((item) => {
          const Icon = item.icon;
          return (
            <div className={style['item']} key={item.title}>
              <Icon
                className={style['icon']}
                style={
                  props.onModal
                    ? { WebkitFilter: 'invert(100%)' }
                    : { WebkitFilter: 'invert(0%)' }
                }
              />
              <h4>{item.title}</h4>
            </div>
          );
        })}
      </div>

      <div className={style['menus']}>
        {Menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <div
              datatype={
                menu.title === 'Thêm vào danh sách phát' &&
                props.music.encodeId === song.id
                  ? 'html'
                  : null
              }
              className={style['item']}
              key={menu.title}
              onClick={() => HandleClickActions(menu.title, props.music.encodeId)}
            >
              <Icon
                className={style['icon']}
                style={
                  props.onModal
                    ? { WebkitFilter: 'invert(100%)' }
                    : { WebkitFilter: 'invert(0%)' }
                }
              />
              <h4>{menu.title}</h4>
            </div>
          );
        })}

        {window.location.href.split('/')[3] === 'myplaylist' && (
          <div className={style['item']} onClick={HandleDeleteMusicInPlaylist}>
            <AiOutlineDelete
              className={style['icon']}
              style={
                musicPopup.type === 'songplayer' ? { WebkitFilter: 'invert(100%)' } : null
              }
              onClick={HandleDeleteMusicInPlaylist}
            />
            <h4>Xóa khỏi playlist này</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicPopup;
