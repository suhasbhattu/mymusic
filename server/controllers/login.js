const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const redirect_uri = "http://localhost:5000/callback";

let access_token = "";
let user_id = "";

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const login = () => {
  return (req, res) => {
    const scope = "streaming user-read-email user-read-private";
    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });
    res.status(200).json({ params: auth_query_parameters.toString() });
  };
};

const loginCallback = () => {
  return (req, res) => {
    const code = req.query.code;

    const headers = {
      Authorization: `Basic ${Buffer.from(
        `${spotify_client_id}:${spotify_client_secret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const data = new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }).toString();

    axios
      .post("https://accounts.spotify.com/api/token", data, {
        headers: headers,
      })
      .then((result) => {
        access_token = result.data.access_token;
        const getUserHeaders = {
          Authorization: `Bearer ${access_token}`,
        };
        axios
          .get("https://api.spotify.com/v1/me", { headers: getUserHeaders })
          .then((resultUser) => {
            user_id = resultUser.data.id;
            res.redirect("/");
          });
      })
      .catch((error) => console.log(error));
  };
};

const accessToken = () => {
  return (req, res) => {
    res.status(200).json({
      access_token: access_token,
    });
  };
};

const getAllPlaylists = () => {
  return async (req, res) => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    const response = await axios.get(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      { headers: headers }
    );

    if (response.status === 200) {
      const responseJSON = response.data.items
        .map((item) => {
          return {
            id: item.id,
            images: item.images,
            name: item.name,
            tracks: item.tracks,
          };
        })
        .sort((item1, item2) =>
          item1.name > item2.name ? 1 : item1.name < item2.name ? -1 : 0
        );

      res.status(200).json({ items: responseJSON });
    } else {
      res.status(500);
    }
  };
};

const getPlaylistById = () => {
  return async (req, res) => {
    const playlistId = req.params.id;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    const response = await axios.get(
      `https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}`,
      { headers: headers }
    );

    if (response.status === 200) {
      const responseJSON = {
        id: response.data.id,
        name: response.data.name,
        images: response.data.images,
        tracks: response.data.tracks.items.map((item) => item.track)
      }
      res.status(200).json(responseJSON);
    } else {
      res.status(500);
    }
  };
};

module.exports = { login, loginCallback, accessToken, getAllPlaylists, getPlaylistById };
