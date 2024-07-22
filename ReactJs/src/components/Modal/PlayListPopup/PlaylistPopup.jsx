import style from './PlaylistPopup.module.scss';
import clsx from 'clsx';
import Modal from 'react-modal';
import { CiPlay1 } from 'react-icons/ci';
import { FiDownload } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { TbShare3 } from 'react-icons/tb';
import { useSelector, useDispatch } from 'react-redux';
import {
  HandlePlayingMusicOnPlaylist,
  HandleAddPlaylistOnMyRecent,
} from '../../../AllFunctions/AllFunctions';
import { setIsPlayListPopup } from '../../../redux/stateSlider';
function PlaylistPopup(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.account);
  const playList = useSelector((state) => state.music.playList);
  const DataPopup = [
    {
      title: 'Thêm vào danh sách phát',
      icon: CiPlay1,
    },
    {
      title: 'Tải xuống',
      icon: FiDownload,
    },
    {
      title: 'Sao chép link',
      icon: IoIosLink,
    },
    {
      title: 'Chia sẻ',
      icon: TbShare3,
    },
  ];

  const HandleAction = async (title) => {
    if (title === 'Thêm vào danh sách phát') {
      try {
        if (playList.id !== props.item.encodeId) {
          await HandlePlayingMusicOnPlaylist(dispatch, props.item.encodeId, 0);
        }
        if (user) {
          await HandleAddPlaylistOnMyRecent(dispatch, user, props.item.encodeId);
        }
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(setIsPlayListPopup({ id: null, state: false }));
  };

  return (
    <div className={style['PlaylistPopup']}>
      <div
        className={style['before']}
        onClick={() => props.HandleClosePlaylistPopup()}
      ></div>
      {DataPopup.map((data) => {
        let Icon = data.icon;
        return (
          <div className={style['item']} onClick={() => HandleAction(data.title)}>
            <h4 className={style['title']}>{data.title}</h4>
            <Icon className={style['icon']} />
          </div>
        );
      })}
    </div>
  );
}

export default PlaylistPopup;
