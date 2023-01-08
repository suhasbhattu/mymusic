import { Playlist, setShowPlaylist } from "../../myMusicSlice";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import TrackBar from "./TrackBar";
import { IconContext } from "react-icons";
import { useAppDispatch } from "../../hooks";

import "./PlaylistDetails.css";

interface PlaylistDetailsProps {
  playlist: Playlist | null;
}

const PlaylistDetails = (props: PlaylistDetailsProps) => {
  const { playlist } = props;
  const dispatch = useAppDispatch();

  const getPlaylistTrackBar = () => {
    const trackBars = playlist?.tracks.map((track) => (
      <TrackBar key={track.id} track={track} />
    ));
    return trackBars;
  };

  const onBackButtonPress = () => {
    dispatch(setShowPlaylist(true));
  };

  return (
    <div className="Playlist">
      <div className="Playlist-toolbar">
        <div>
          <IconContext.Provider value={{ color: "#eaecee" }}>
            <button
              className="Playlist-back-button"
              onClick={onBackButtonPress}
            >
              <FaArrowLeft />
            </button>
          </IconContext.Provider>
        </div>
        <div className="Playlist-name">
          <span>{playlist?.name}</span>
        </div>
        <div className="Playlist-play">
          <IconContext.Provider value={{ color: "#eaecee" }}>
            <button className="Playlist-play-button">
              <FaPlay /> Play
            </button>
          </IconContext.Provider>
        </div>
      </div>
      <div className="Playlist-tracks">{getPlaylistTrackBar()}</div>
    </div>
  );
};

export default PlaylistDetails;
