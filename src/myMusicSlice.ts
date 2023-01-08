import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface PlaylistThumbnail {
  height: number;
  url: string;
  width: string;
}

export interface PlaylistTracksSummary {
  href: string;
  total: number;
}

export interface PlaylistSummary {
  id: string;
  images: PlaylistThumbnail[];
  name: string;
  tracks: PlaylistTracksSummary;
}

export interface PlaylistAlbum {
  id: string;
  images: PlaylistThumbnail[];
  name: string;
}

export interface PlaylistArtist {
  id: string;
  name: string;
}

export interface PlaylistTrack {
  id: string;
  name: string;
  trackNumber: number;
  album: PlaylistAlbum;
  duration_ms: number;
  artists: PlaylistArtist[];
}

export interface Playlist {
  id: string;
  images: PlaylistThumbnail[];
  name: string;
  tracks: PlaylistTrack[];
}

export interface MyMusicState {
  token: string;
  showPlaylist: boolean;
  playlists: PlaylistSummary[] | null;
  currentPlaylist: Playlist | null;
}

const initialState: MyMusicState = {
  token: "",
  showPlaylist: false,
  playlists: null,
  currentPlaylist: null
};

export const myMusicSlice = createSlice({
  name: "myMusic",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setPlaylists: (state, action: PayloadAction<PlaylistSummary[]>) => {
      state.playlists = action.payload;
    },
    setShowPlaylist: (state, action: PayloadAction<boolean>) => {
      state.showPlaylist = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.currentPlaylist = action.payload;
    },
  },
});

export const { setToken, setPlaylists, setShowPlaylist, setCurrentPlaylist } = myMusicSlice.actions;

export const selectToken = (state: RootState) => state.myMusic.token;

export const selectPlaylists = (state: RootState) => state.myMusic.playlists;

export const selectCurrentPlaylist = (state: RootState) => state.myMusic.currentPlaylist;

export const selectShowPlaylist = (state: RootState) =>
  state.myMusic.showPlaylist;

export default myMusicSlice.reducer;
