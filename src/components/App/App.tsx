import { useEffect } from "react";
import authenticationApi from "../../apis/authenticationApi";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectCurrentPlaylist,
  selectShowPlaylist,
  selectToken,
  setShowPlaylist,
  setToken,
} from "../../myMusicSlice";
import PlaylistDetails from "../PlaylistDetails/PlaylistDetails";
import Playlists from "../Playlists/Playlists";

import "./App.css";

const App = () => {
  const token = useAppSelector(selectToken);
  const showPlaylist = useAppSelector(selectShowPlaylist);
  const currentPlaylist = useAppSelector(selectCurrentPlaylist);
  const dispatch = useAppDispatch();
  const { loginWithSpotify, getAccessToken } = authenticationApi;

  const onLoginClick = () => {
    loginWithSpotify().then((response) => {
      window.location.href = `https://accounts.spotify.com/authorize/?${response.data.params}`;
    });
  };

  useEffect(() => {
    getAccessToken().then((response) => {
      const accessToken = response.data.access_token;
      dispatch(setToken(accessToken));
      dispatch(setShowPlaylist(true));
    });
  }, [getAccessToken, dispatch, token.length]);

  return (
    <div className="App">
      <div className="App-header">
        <h3 className="App-header-text">My Music</h3>
      </div>
      <div className="App-content">
        {token.length === 0 && (
          <div className="App-content-login">
            <button className="Login-button" onClick={onLoginClick}>
              <span className="Login-button-text">Login with Spotify</span>
            </button>
          </div>
        )}
        {token.length > 0 && showPlaylist && <Playlists />}
        {token.length > 0 && !showPlaylist && (
          <PlaylistDetails playlist={currentPlaylist} />
        )}
      </div>
    </div>
  );
};

export default App;
