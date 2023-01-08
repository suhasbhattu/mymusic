import { PlaylistSummary } from "../../myMusicSlice";
import "./Playlists.css";

interface PlaylistTileProps {
  tile: PlaylistSummary;
  onClick: (id: string) => void;
}

const PlaylistTile = (props: PlaylistTileProps) => {
  const { tile } = props;
  const onTileClick = () => {
    props.onClick(tile.id);
  };

  return (
    <div className="PlaylistTile" onClick={onTileClick}>
      <div className="PlaylistTile-Image">
        <img
          src={tile.images[1].url}
          alt={tile.name}
          height={tile.images[1].height}
          width={tile.images[1].width}
        />
      </div>
      <div className="PlaylistTile-Name">
        <span>{tile.name}</span>
      </div>
    </div>
  );
};

export default PlaylistTile;
