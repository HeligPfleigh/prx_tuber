import axios from 'axios';

import {IArtist, IPlaylist, ISong} from './types';

const API_SERVER = 'http://onesharemedia.club/yt';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 10000,
});

export const getHomeCharts = async (): Promise<{
  discover: Array<IPlaylist>;
  hotTopic: Array<IPlaylist>;
  topSong: Array<IPlaylist>;
}> => {
  const {data} = await instance.get('/chart');

  return data?.data;
};

export const getPlaylists = async (): Promise<Array<IPlaylist>> => {
  const {data} = await instance.get('/jamendo/playlist');

  return data?.data;
};

export const getTopSong = async (): Promise<Array<ISong>> => {
  const {data} = await instance.get('/jamendo/topsong');

  return data?.data;
};

export const getArtists = async (): Promise<Array<IArtist>> => {
  const {data} = await instance.get('/artist');

  return data?.data;
};
