import axios from 'axios';
import { LOCAL_URL } from './constant';
import { setAccount } from './accountSlider';
import { axiosJWT } from '../axios/axios';

export const ApiCheckUser = async (email) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/account/checkUser`, { email });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiRegister = async (dispatch, data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/account/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiLogin = async (dispatch, data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/account/login`, data, {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch(setAccount(res.data.user));
    localStorage.setItem('refreshToken', res.data.refreshToken);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiCreatePlayList = async (dispatch, data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/playlist/createPlayList`, data);
    console.log(res.data);
    // dispatch(setAccount(res.data));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiAddMyPlayList = async (dispatch, data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/account/add-my-playlist`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetMyPlayList = async (id) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/account/get-my-playlist`, id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetDetalMyPlayList = async ({ id }) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/account/get-detal-playlist`, { id });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const ApiGetSuggestions = async ({ data }) => {
  try {
    const suggestions = await axios.post(`${LOCAL_URL}/music/search`, { data });
    return suggestions.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiAddMusicOnPlaylist = async (data) => {
  try {
    const res = await axiosJWT.post(`${LOCAL_URL}/playlist/addMusicOnPlayList`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetListMusicOnPlaylist = async ({ id }) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/music/getListMusicOnPlaylist`, { id });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiExample = async () => {
  try {
    const res = await axios.post(`/account`, { id: 123 });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiRefreshTokenByUser = async ({ refreshToken }) => {
  try {
    const res = await axios.post(
      `${LOCAL_URL}/account/refreshTokenByUser`,
      { refreshToken },
      { withCredentials: true },
    );
    console.log(res.data);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const ApiAddMusicOnMyFavourites = async (dispatch, data) => {
  try {
    console.log(data);
    const res = await axiosJWT.post(
      `${LOCAL_URL}/account/changeMusicOnMyFavourites`,
      data,
      { withCredentials: true },
    );
    dispatch(setAccount(res.data.user));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiAddAlbumOnMyFavourites = async (dispatch, { id, data }) => {
  try {
    console.log(data);
    const res = await axiosJWT.post(
      `${LOCAL_URL}/account/changeAlbumOnMyFavourites`,
      { id, data },
      { withCredentials: true },
    );
    dispatch(setAccount(res.data.user));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiRemoveMusicOnMyFavourites = async (dispatch, { id, data }) => {
  try {
    console.log(data);
    const res = await axiosJWT.post(
      `${LOCAL_URL}/account/removeMusicOnMyFavourites`,
      {
        id,
        data,
      },
      { withCredentials: true },
    );
    console.log(res.data);
    dispatch(setAccount(res.data.user));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiAddMusicOnRecentMusic = async (dispatch, data) => {
  try {
    const res = await axiosJWT.post(`${LOCAL_URL}/account/addMusicOnRecent`, data, {
      withCredentials: true,
    });
    dispatch(setAccount(res.data.user));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiAddAlbumOnRecentMusic = async (dispatch, data) => {
  try {
    const res = await axiosJWT.post(`${LOCAL_URL}/account/addAlbumOnRecent`, data, {
      withCredentials: true,
    });
    dispatch(setAccount(res.data.user));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetListAlbum = async (data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/account/getListAlbum`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetListMusic = async (data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/music/getListMusic`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiDeletePlayList = async (dispatch, { idUser, MyPlayList, id }) => {
  try {
    const res = await axiosJWT.post(
      `${LOCAL_URL}/playlist/deletePlayList`,
      {
        idUser,
        MyPlayList,
        id,
      },
      {
        withCredentials: true,
      },
    );
    dispatch(setAccount(res.data.user));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiUpdateAvatar = async (dispatch, { image }) => {
  try {
    const res = await axiosJWT.post(
      `${LOCAL_URL}/account/updateAvatar`,
      {
        id: localStorage.getItem('id'),
        avatar: image,
      },
      {
        withCredentials: true,
      },
    );
    dispatch(setAccount(res.data.user));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
