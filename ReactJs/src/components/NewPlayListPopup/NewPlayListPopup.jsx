import style from './NewPlayListPopup.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { ApiAddMyPlayList, ApiCreatePlayList } from '../../redux/ApiAccount';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
function NewPlayListPopup() {
  const dispatch = useDispatch();
  const listPlayList = useSelector((state) => state?.account?.account?.MyPlayList);
  const Selected = [
    {
      title: 'Công khai',
      subtitle: 'Mọi người có thể thấy playlist này',
    },
    {
      title: 'Phát ngẫu nhiên',
      subtitle: 'Luôn phát ngẫu nhiên tất cả bài hát',
    },
  ];
  const [isPublic, setIsPublic] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [name, setName] = useState('');
  console.log(name);

  const HandleCreatePlayList = () => {
    const handleConvert = (chuoi) => {
      const bangBoiTiengAnh = {
        á: 'a',
        à: 'a',
        ả: 'a',
        ấ: 'a',
        ặ: 'a',
        ẵ: 'a',
        ǝ: 'e',
        ê: 'e',
        ẹ: 'e',
        ẻ: 'e',
        ǝ̀: 'e',
        ế: 'e',
        i: 'i',
        í: 'i',
        ì: 'i',
        ỉ: 'i',
        ĩ: 'i',
        ó: 'o',
        ò: 'o',
        ỏ: 'o',
        ố: 'o',
        ộ: 'o',
        ỡ: 'o',
        ơ: 'o',
        ớ: 'o',
        ờ: 'o',
        ở: 'o',
        ỡ: 'o',
        ứ: 'u',
        ù: 'u',
        ủ: 'u',
        ứ: 'u',
        ữ: 'u',
        ỳ: 'y',
        ý: 'y',
        ỵ: 'y',
        đ: 'd',
        Đ: 'D',
      };

      const chuoiChuyenDoi = chuoi
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split('')
        .map((kyTu) => bangBoiTiengAnh[kyTu] || kyTu)
        .join('')
        .split(' ')
        .join('-');
      return chuoiChuyenDoi;
    };
    let newPlaylist = {
      id: uuidv4(),
      idUser: localStorage.getItem('id'),
      alias: handleConvert(name),
      name: name,
      isPublic: isPublic,
      isRandom: isRandom,
      avatar: 'https://photo-zmp3.zmdcdn.me/album_default.png',
      listIdMusics: [],
    };

    ApiCreatePlayList(dispatch, newPlaylist);

    ApiAddMyPlayList(dispatch, {
      id: localStorage.getItem('id'),
      myPlayList: [...listPlayList, newPlaylist.id],
    }).then((data) => {
      window.location.reload();
    });
  };
  return (
    <div className={style['NewPlayListPopup']}>
      <h3>Tạo playlist mới</h3>
      <input
        className={style['name']}
        type="text"
        placeholder="Nhập tên playlist"
        onChange={(e) => setName(e.target.value)}
      />
      <div className={style['selected']}>
        {Selected.map((item) => {
          return (
            <div className={style['item']}>
              <div className={style['content']}>
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
              <div
                className={style['check']}
                style={
                  (item.title === 'Công khai' && isPublic) ||
                  (item.title === 'Phát ngẫu nhiên' && isRandom)
                    ? { backgroundColor: '#c273ed' }
                    : null
                }
                onClick={() => {
                  if (item.title === 'Công khai') {
                    setIsPublic(!isPublic);
                  }
                  if (item.title === 'Phát ngẫu nhiên') {
                    setIsRandom(!isRandom);
                  }
                }}
              >
                <div
                  className={
                    (item.title === 'Công khai' && isPublic) ||
                    (item.title === 'Phát ngẫu nhiên' && isRandom)
                      ? style.active
                      : null
                  }
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        style={name !== '' ? { backgroundColor: '#9b4de0' } : null}
        onClick={HandleCreatePlayList}
      >
        <h5 style={name !== '' ? { color: '#fff' } : null}>TẠO MỚI</h5>
      </button>
    </div>
  );
}

export default NewPlayListPopup;
