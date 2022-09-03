export type IPlaylist = {
  id: string;
  createdAt: number;
  type: string;
  urlthumb: string;
  playListId: string;
  playListGroup: string;
  name: string;
};

export type ISong = {
  id: number;
  name: string;
  duration: number;
  artistId: string;
  artistName: string;
  artistIdstr: string;
  albumName: string;
  albumId: string;
  licenseCcurl: string;
  position: number;
  releaseDate: string;
  albumImage: string;
  audio: string;
  audioDownload: string;
  prourl: string;
  shorturl: string;
  shareurl: string;
  image: string;
  audioDownloadAllowed: boolean;
  source: string | null;
};

export type IArtist = {
  id: string;
  createdAt: number;
  nameArtist: string;
  avatar: string;
  orderTag: number;
};
