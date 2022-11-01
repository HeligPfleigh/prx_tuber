import axios from 'axios';

import {IArtist, IPlaylist, ISong} from './types';

const API_SERVER = 'http://onesharemedia.club/yt';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 10000,
});

// export const getYTCharts = async (): Promise<{
//   discover: Array<IPlaylist>;
//   hotTopic: Array<IPlaylist>;
//   topSong: Array<IPlaylist>;
// }> => {
//   const {data} = await instance.get('/chart');

//   return data?.data;
// };

export const getJamendoCharts = async (): Promise<{
  discover: Array<IPlaylist>;
  hotTopic: Array<IPlaylist>;
  topSong: Array<IPlaylist>;
}> => {
  const {data} = await instance.get('/jamendo/playlist');

  return {
    discover: (data?.data || []).filter(
      (item: IPlaylist) => item.type === 'discover',
    ),
    hotTopic: (data?.data || []).filter(
      (item: IPlaylist) => item.type === 'hotTopic',
    ),
    topSong: [],
  };
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

export const getSongsOfJamendoPlaylist = async (
  playlistId: string,
): Promise<Array<ISong>> => {
  const {data} = await instance.get('/jamendo/byPlaylist', {
    params: {
      playlistId,
    },
  });

  return data?.data;
};

export const searchSong = async (query: string): Promise<Array<ISong>> => {
  const {data} = await instance.get('/jamendo/search', {
    params: {
      query,
    },
  });

  return data?.data;
};

// fake artist detail endpoint
export const getArtistDetail = async (name: string): Promise<Array<ISong>> => {
  const {data} = await instance.get('/jamendo/search', {
    params: {
      query: name,
    },
  });

  return data?.data;
};
