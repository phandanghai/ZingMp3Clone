import { createSlice } from '@reduxjs/toolkit';

const initaState = {
  playList: { id: null, index: null, data: [] },
  song: {
    id: null,
    state: true,
    show: true,
  },
  showModal: false,
  settingsModal: false,
  params: null,
  listMusicModal: false,
  musicPopup: { state: false, id: null, type: null },
};

const MusicSlider = createSlice({
  name: 'MusicSlider',
  initialState: initaState,
  reducers: {
    setPlayList: (state, action) => {
      state.playList = action.payload;
    },
    setSong: (state, action) => {
      state.song = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setParams: (state, action) => {
      state.params = action.payload;
    },
    setSettingsModal: (state, action) => {
      state.settingsModal = action.payload;
    },
    setListMusicModal: (state, action) => {
      state.listMusicModal = action.payload;
    },
    setMusicPopup: (state, action) => {
      state.musicPopup = action.payload;
    },
  },
});

export default MusicSlider.reducer;
export const {
  setPlayList,
  setSong,
  setShowModal,
  setParams,
  setSettingsModal,
  setListMusicModal,
  setMusicPopup,
} = MusicSlider.actions;
