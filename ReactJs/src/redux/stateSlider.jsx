import { createSlice } from '@reduxjs/toolkit';

const initaState = {
  size: {
    width: null,
    height: null,
  },
  isAccountPopup: false,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  isNewPlayListPopup: false,
  isLogin: false,
  isPlayListPopup: { id: null, state: false },
  isLoginPopup: false,
};

const StateSlider = createSlice({
  name: 'state',
  initialState: initaState,
  reducers: {
    setSized: (state, action) => {
      state.size.width = action.payload.width;
      state.size.height = action.payload.height;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsEnded: (state) => {
      state.isPlaying = false;
    },
    setIsRepeat: (state, action) => {
      state.isRepeat = action.payload;
    },
    setIsNewPlayListPopup: (state, action) => {
      state.isNewPlayListPopup = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setIsPlayListPopup: (state, action) => {
      state.isPlayListPopup = action.payload;
    },
    setIsRandom: (state, action) => {
      state.isRandom = action.payload;
    },
    setIsAccountPopup: (state, action) => {
      state.isAccountPopup = action.payload;
    },
    setIsLoginPopup: (state, action) => {
      state.isLoginPopup = action.payload;
    },
  },
});

export const {
  setSized,
  setIsPlaying,
  setIsEnded,
  setIsRandom,
  setIsLogin,
  setIsRepeat,
  setIsLoginPopup,
  setIsNewPlayListPopup,
  setIsPlayListPopup,
  setIsAccountPopup,
} = StateSlider.actions;

export default StateSlider.reducer;
