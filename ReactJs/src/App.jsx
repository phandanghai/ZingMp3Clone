import { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routers } from './routers';
import Menu from './components/Menu/Menu';
import Heading from './components/Heading/Heading';
import SongPlayer from './components/SongPlayer/SongPlayer';
import { useSelector, useDispatch } from 'react-redux';
import LyricsModal from './components/LyricsModal/LyricsModal';
import SettingsModal from './components/Modal/SettingsModal/SettingsModal';
import LayoutPopup from './components/Modal/Layout/Layout';
import IntroductPopup from './components/Modal/IntroductModal/IntroductModal';
import AccountModal from './components/Modal/AccountModal/AccountModal';
import ListMusicModal from './components/Modal/ListMusicModal/ListMusicModal';
import NewPlayListPopup from './components/NewPlayListPopup/NewPlayListPopup';
import { setIsAccountPopup, setIsNewPlayListPopup } from './redux/stateSlider';
import { ToastContainer, toast } from 'react-toastify';
import AccountPopup from './components/Popup/AccountPopup';
import LoginPopup from './components/Popup/LoginPopup/LoginPopup';
function App() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const song = useSelector((state) => state.music.song);
  const isAccountPopup = useSelector((state) => state.state.isAccountPopup);
  const isLogin = useSelector((state) => state.state.isLogin);
  const showModal = useSelector((state) => state.music.showModal);
  const listMusicModal = useSelector((state) => state.music.listMusicModal);
  const isNewPlayListPopup = useSelector((state) => state.state.isNewPlayListPopup);
  const isLoginPopup = useSelector((state) => state.state.isLoginPopup);
  const settingsRef = useRef();
  const layoutRef = useRef();
  const IntroductRef = useRef();
  const LoginPopupRef = useRef();
  const HeadingRef = useRef();
  const newPlayListPopup = useRef();
  const AccountPopupRef = useRef();
  const [isSettingsModal, setIsSettingsModal] = useState(false);
  const [isLayoutPopup, setIsLayoutPopup] = useState(false);
  const [isIntroductPopup, setIsIntroductPopup] = useState(false);

  const [resize, setResize] = useState({
    width: null,
    height: null,
  });
  useEffect(() => {
    const HandleResize = () => {
      setResize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', HandleResize);
    return () => {
      window.removeEventListener('resize', HandleResize);
    };
  }, [window]);

  useEffect(() => {
    console.log(window.location.href.split('/')[3]);
    setResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    const HandleCheckOut = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setIsSettingsModal(false);
      } else if (layoutRef.current && !layoutRef.current.contains(e.target)) {
        setIsLayoutPopup(false);
      } else if (IntroductRef.current && !IntroductRef.current.contains(e.target)) {
        setIsIntroductPopup(false);
      } else if (AccountPopupRef.current && !AccountPopupRef.current.contains(e.target)) {
        dispatch(setIsAccountPopup(false));
      } else if (
        newPlayListPopup.current &&
        !newPlayListPopup.current.contains(e.target)
      ) {
        console.log('click ở ngoài');
        dispatch(setIsNewPlayListPopup(false));
      }
    };
    window.addEventListener('mousedown', HandleCheckOut);
    return () => {
      window.removeEventListener('mousedown', HandleCheckOut);
    };
  }, [settingsRef, layoutRef, IntroductRef, AccountPopupRef, newPlayListPopup]);

  const HandleOpenSettingModal = (state) => {
    setIsSettingsModal(state);
  };
  const HandleCloseLayoutPopup = () => {
    setIsLayoutPopup(!isLayoutPopup);
  };

  const HandleToggleIntroduct = (state) => {
    setIsIntroductPopup(state);
  };
  const HandleCloseAccountPopup = () => {
    dispatch(setIsAccountPopup(false));
  };
  const HandleRequestLogin = () => {
    toast.warning('Vui lòng đăng nhập', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  return (
    <Router>
      <Routes>
        {routers.map((route) => {
          const Page = route.component;
          const show = route.showSongModal;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <>
                  <ToastContainer />
                  <Heading
                    forwardRef={HeadingRef}
                    HandleOpenSettingModal={HandleOpenSettingModal}
                  />
                  <Menu />
                  <Page />
                  {song.state &&
                    window.location.href.split('/')[3] !== 'dang-nhap' &&
                    window.location.href.split('/')[3] !== 'dang-ky' && <SongPlayer />}
                  <LyricsModal />
                  <div
                    className={'listMusicModal'}
                    style={
                      listMusicModal
                        ? { transform: 'translateX(0%)' }
                        : { transform: 'translateX(100%)' }
                    }
                  >
                    <ListMusicModal HandleRequestLogin={HandleRequestLogin} />
                  </div>
                  {isSettingsModal && (
                    <div className={'settingsModal'} ref={settingsRef}>
                      <SettingsModal
                        HandleOpenSettingModal={HandleOpenSettingModal}
                        HandleCloseLayoutPopup={HandleCloseLayoutPopup}
                        HandleToggleIntroduct={HandleToggleIntroduct}
                      />
                    </div>
                  )}
                  {isLayoutPopup && (
                    <div className={'layout'}>
                      <div className={'popup'} ref={layoutRef}>
                        <LayoutPopup HandleCloseLayoutPopup={HandleCloseLayoutPopup} />
                      </div>
                    </div>
                  )}
                  {isIntroductPopup && (
                    <div className={'introduct'}>
                      <div className={'popup'} ref={IntroductRef}>
                        <IntroductPopup HandleToggleIntroduct={HandleToggleIntroduct} />
                      </div>
                    </div>
                  )}
                  {isNewPlayListPopup && (
                    <div className={'modal'}>
                      <div className={'newPlayListPopup'} ref={newPlayListPopup}>
                        <NewPlayListPopup />
                      </div>
                    </div>
                  )}
                  {/* <AccountModal /> */}
                  {isAccountPopup && (
                    <div className="AccountPopup" ref={AccountPopupRef}>
                      <AccountPopup HandleCloseAccountPopup={HandleCloseAccountPopup} />
                    </div>
                  )}

                  {isLoginPopup && (
                    <div className="rm .git/index.lock" ref={LoginPopupRef}>
                      <LoginPopup />
                    </div>
                  )}
                </>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
