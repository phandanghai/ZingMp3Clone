import axios from 'axios';
import { LOCAL_URL } from '../redux/constant';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ApiRefreshTokenByUser } from '../redux/ApiAccount';
export const axiosJWT = axios.create({
  baseURL: `${LOCAL_URL}`,
});

axiosJWT.interceptors.request.use(async (config) => {
  const date = new Date();
  const accessToken = Cookies.get('accessToken');
  console.log(accessToken);
  const decoded = jwtDecode(accessToken);
  console.log(decoded.exp, date.getTime() / 1000);
  if (decoded.exp > date.getTime() / 1000) {
    console.log('token chưa hết hạn');
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log('token hết hạn');
    const refreshToken = localStorage.getItem('refreshToken');
    await ApiRefreshTokenByUser({ refreshToken: refreshToken }).then((data) => {
      // store.dispatch(getUserSuccess(data.data.user));
      config.headers.Authorization = `Bearer ${data.data.accessToken}`;
    });
  }
  return config;
});

axiosJWT.interceptors.response.use(
  (response) => response,
  (error) => {},
);
