import { useSelector } from 'react-redux';
import { ApiGetPlayList } from '../redux/ApiMusic';
import { ApiAddAlbumOnRecentMusic, ApiAddMusicOnRecentMusic } from '../redux/ApiAccount';
import { setSong, setPlayList } from '../redux/musicSlider';
import { setIsPlaying } from '../redux/stateSlider';
//Chỉnh sửa tiêu đề của bài hát
export const HandleEditTitleForMusic = (music, character, word) => {
  const indexCharacter = music.indexOf('/');

  if (music.length > character) {
    if (indexCharacter < 27 && indexCharacter > -1) {
      const newTitle = music.split(' ').slice(0, 3).join(' ');
      return `${newTitle} ...`;
    } else {
      const newTitle = music.split(' ').slice(0, word).join(' ');
      return `${newTitle} ...`;
    }
  } else {
    return music;
  }
};

//Chỉnh sửa đường link trên trang nghệ sĩ
export const HandleEditArtistLink = (link) => {
  if (link.substring(0, 8) === '/nghe-si') {
    return `${link}`;
  } else {
    return `/nghe-si${link}`;
  }
};
//Phát nhạc khi click playlist
export const HandlePlayingMusicOnPlaylist = (dispatch, id, index) => {
  console.log(index);
  ApiGetPlayList({ id: id }).then((data) => {
    const listMusics = data.data.data.song.items.map((item) => {
      return item.encodeId;
    });
    dispatch(
      setPlayList({ id: data?.data?.data?.encodeId, data: listMusics, index: index }),
    );
    dispatch(setSong({ id: listMusics[0], state: true }));
    dispatch(setIsPlaying(true));
    return listMusics;
  });
};

export const HandleAddPlaylistOnMyRecent = (dispatch, user, id) => {
  if (user?.MyRecent?.listAlbum?.length === 4) {
    if (user?.MyRecent?.listAlbum?.includes(id)) {
      console.log('playlist bị trùng---đẩy playlist này lên đầu');
      const index = user?.MyRecent?.listAlbum?.findIndex((number) => number === id);
      const newData = user?.MyRecent?.listAlbum?.filter((num) => num !== id);
      newData.unshift(user?.MyRecent?.listAlbum[index]);
      console.log(newData);
      ApiAddAlbumOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    } else {
      console.log('xóa playlist thứ 4 --- đẩy playlist mới lên đầu');
      const newData = [...user?.MyRecent?.listAlbum];
      newData.unshift(id);
      newData.pop();
      ApiAddAlbumOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    }
  } else {
    if (user.MyRecent.listAlbum.includes(id)) {
      console.log('playlist bị trùng --- đẩy playlist này lên đầu');
      const index = user?.MyRecent?.listAlbum?.findIndex((number) => number === id);
      const newData = user?.MyRecent?.listAlbum?.filter((num) => num !== id);
      newData.unshift(user?.MyRecent?.listAlbum[index]);
      ApiAddAlbumOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    } else {
      console.log('thêm mới id playlist');
      const newData = [...user?.MyRecent?.listAlbum];
      newData.unshift(id);
      console.log(newData);
      ApiAddAlbumOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    }
  }
};

export const HandleAddMusicOnMyRecent = (dispatch, user, id) => {
  if (user?.MyRecent?.listMusic?.length >= 4) {
    if (user.MyRecent?.listMusic.includes(id)) {
      console.log(
        'music bị trùng ---có 4 bài hát trong playlist --- đẩy music này lên đầu',
      );
      console.log('music bị trùng --- đẩy music này lên đầu');
      const newData = user?.MyRecent?.listMusic?.filter((num) => num !== id);
      newData.unshift(id);
      console.log(newData);
      ApiAddMusicOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    } else {
      console.log('xóa music thứ 4 --- đẩy music mới lên đầu');
      const newData = [...user?.MyRecent?.listMusic];
      newData.pop();
      newData.unshift(id);
      console.log(newData);
      ApiAddMusicOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    }
  } else {
    if (user?.MyRecent?.listMusic.includes(id)) {
      console.log('music bị trùng --- đẩy music này lên đầu');
      const newData = user?.MyRecent?.listMusic?.filter((num) => num !== id);
      newData.unshift(id);
      console.log(newData);
      ApiAddMusicOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    } else {
      console.log('thêm mới id music');
      const newData = [...user?.MyRecent?.listMusic];
      newData.unshift(id);
      console.log(newData);
      ApiAddMusicOnRecentMusic(dispatch, {
        id: localStorage.getItem('id'),
        data: newData,
      });
    }
  }
};
