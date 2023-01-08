import moment from "moment";
import { PlaylistTrack } from "../../myMusicSlice";
import "./PlaylistDetails.css";

interface TrackBarProps {
  track: PlaylistTrack;
}

const TrackBar = (props: TrackBarProps) => {
  const { track } = props;

  const getTrackDuration = (milliseconds: number) => {
    return moment.utc(milliseconds).format("m:ss");
  };

  return (
    <div className="Playlist-track">
      <div className="Playlist-track-thumbnail">
        <img src={track.album.images[2].url} alt={track.name} />
      </div>
      <div className="Playlist-track-name">
        <span>{track.name}</span>
        <div className="Playlist-artist-name">
          <span>{track.artists[0].name}</span>
        </div>
      </div>
      <div className="Playlist-track-album-name">
        <span>{track.album.name}</span>
      </div>
      <div className="Playlist-track-duration">
        <span>{getTrackDuration(track.duration_ms)}</span>
      </div>
    </div>
  );
};

export default TrackBar;
