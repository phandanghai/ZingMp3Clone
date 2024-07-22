import LibraryPage from '../pages/LibraryPage/LibraryPage';
import AlbumPage from '../pages/AlbumPage/AlbumPage';
import AllMusicPage from '../pages/AllMusicPage/AllMusicPage';
import ArtistPages from '../pages/ArtistPages/ArtistPages';
import CollectionPage from '../pages/CollectionPage/CollectionPage';
import HomePages from '../pages/HomePages/HomePages';
import MVPage from '../pages/MVPage/MVPage';
import MusicCharts from '../pages/MusicCharts/MusicCharts';
import MyPlayListPage from '../pages/MyPlayListPage/MyPlayListPage';
import PlayListPages from '../pages/Pla.ylistPages/PlaylistPages';
import SinglePage from '../pages/SinglePage/SinglePage';
import TopicPage from '../pages/TopicPage/TopicPage';
import RadioPage from '../pages/RadioPage/RadioPage';
import MusicPage from '../pages/MusicPages/MusicPages';
import Top100Page from '../pages/Top100Page/Top100Page';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SearchPages from '../pages/SearchPages/SearchPages';
export const routers = [
  { path: '/', component: HomePages, layout: null },
  {
    path: '/ket-qua-tim-kiem/:params',
    component: SearchPages,
    layout: null,
    showSongModal: true,
  },
  { path: '/dang-ky', component: RegisterPage, layout: null, showSongModal: false },
  { path: '/dang-nhap', component: LoginPage, layout: null, showSongModal: false },
  {
    path: '/album/:name/:id',
    component: PlayListPages,
    layout: null,
    showSongModal: true,
  },
  { path: '/top-100', component: Top100Page, layout: null, showSongModal: true },
  {
    path: '/bai-hat/:alias/:id',
    component: MusicPage,
    layout: null,
    showSongModal: true,
  },
  { path: '/radio', component: RadioPage, layout: null, showSongModal: true },
  { path: '/chu-de&&the-loai', component: TopicPage, layout: null, showSongModal: true },
  { path: '/moi-phat-hanh', component: MusicCharts, layout: null, showSongModal: true },
  {
    path: '/playlist/:name/:id',
    component: PlayListPages,
    layout: null,
    showSongModal: true,
  },
  {
    path: '/myplaylist/:name/:id',
    component: PlayListPages,
    layout: null,
    showSongModal: true,
  },
  { path: '/nghe-si/:id', component: ArtistPages, layout: null, showSongModal: true },
  {
    path: '/ca-si/:id/bai-hat',
    component: AllMusicPage,
    layout: null,
    showSongModal: true,
  },
  { path: '/ca-si/:id/single', component: SinglePage, layout: null, showSongModal: true },
  { path: '/ca-si/:id/album', component: AlbumPage, layout: null, showSongModal: true },
  { path: '/ca-si/:id/mv', component: MVPage, layout: null, showSongModal: true },
  {
    path: '/ca-si/:id/tuyen-tap',
    component: CollectionPage,
    layout: null,
    showSongModal: true,
  },
  {
    path: '/mymusic/nghe-gan-day',
    component: LibraryPage,
    layout: null,
    showSongModal: true,
  },
  {
    path: '/mymusic/danh-sach-yeu-thich/album',
    component: LibraryPage,
    layout: null,
    showSongModal: true,
  },
  {
    path: '/mymusic/danh-sach-yeu-thich/da-tai-len',
    component: LibraryPage,
    layout: null,
    showSongModal: true,
  },
  {
    path: '/mymusic/danh-sach-yeu-thich',
    component: LibraryPage,
    layout: null,
    showSongModal: true,
  },

  {
    path: '/mymusic/myplaylist',
    component: MyPlayListPage,
    layout: null,
    showSongModal: true,
  },
];
