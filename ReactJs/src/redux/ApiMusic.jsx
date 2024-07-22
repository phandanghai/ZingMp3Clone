import axios from 'axios';
import { LOCAL_URL } from './constant';

export const ApiGetHome = async () => {
  try {
    const data = await axios.get(`${LOCAL_URL}/music/getHome`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetPlayList = async (id) => {
  try {
    const data = await axios.post(`${LOCAL_URL}/music/getPlayList`, id);
    // console.log(data.data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetArtists = async (names) => {
  try {
    const data = await axios.post(`${LOCAL_URL}/music/getArtists`, names);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetDetalArtist = async (ids) => {
  try {
    const data = await axios.post(`${LOCAL_URL}/music/getListSongArtists`, ids);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetSong = async (id) => {
  try {
    const data = await axios.post(`${LOCAL_URL}/music/getSong`, id);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetSongInfo = async (id) => {
  try {
    const data = await axios.post(`${LOCAL_URL}/music/getSongInfo`, id);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetTop100 = async () => {
  try {
    const data = await axios.get(`${LOCAL_URL}/music/getTop100`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetListMusicInfo = async (data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/music/getListMusic`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiGetDetalListAlbum = async (data) => {
  try {
    console.log(data);
    const res = await axios.post(`${LOCAL_URL}/music/getListAlbum`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiSearchMusic = async (data) => {
  try {
    const res = await axios.post(`${LOCAL_URL}/music/search`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
