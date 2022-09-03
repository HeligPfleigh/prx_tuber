import axios from 'axios';
import {IPlaylist} from './types';

const API_SERVER = 'http://onesharemedia.club/yt';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 10000,
});

export const getPlaylists = async (): Promise<Array<IPlaylist>> => {
  const {data} = await instance.get('/jamendo/playlist');

  return data?.data;
};
