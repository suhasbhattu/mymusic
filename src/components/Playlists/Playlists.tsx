import { useEffect } from "react";
import mymusicApi from "../../apis/mymusicApi";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectPlaylists,
  setCurrentPlaylist,
  setPlaylists,
  setShowPlaylist,
} from "../../myMusicSlice";
import "./Playlists.css";
import PlaylistTile from "./PlaylistTile";

const Playlists = () => {
  const playlists = useAppSelector(selectPlaylists);
  const dispatch = useAppDispatch();
  const { getPlaylists, getPlaylistById } = mymusicApi;

  const onTileClick = (id: string) => {
    getPlaylistById(id).then((result) => {
      dispatch(setCurrentPlaylist(result.data));
      dispatch(setShowPlaylist(false));
    });
  };

  const getTiles = () => {
    const tiles = playlists?.map((playlist) => (
      <PlaylistTile
        key={playlist.id}
        tile={{ ...playlist }}
        onClick={onTileClick}
      />
    ));
    return tiles;
  };

  useEffect(() => {
    getPlaylists().then((result) => {
      dispatch(setPlaylists(result.data.items));
    });
  }, [getPlaylists, dispatch]);

  return (
    <div className="Playlists">
      <div className="Playlists-title">
        <span>Playlists</span>
      </div>
      <div className="Playlists-tiles">{getTiles()}</div>
    </div>
  );
};

export default Playlists;
