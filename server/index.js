const express = require("express");
const bodyParser = require("body-parser");
const { makeCallback } = require("./callback/callback");
const {
  login,
  loginCallback,
  accessToken,
  getAllPlaylists,
  getPlaylistById,
} = require("./controllers/login");
const path = require("path");
const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.send("Namaste!!");
});

app.get("/login", makeCallback(login()));

app.get("/callback", makeCallback(loginCallback()));

app.get("/token", makeCallback(accessToken()));

app.get("/playlists", makeCallback(getAllPlaylists()));

app.get("/playlists/:id", makeCallback(getPlaylistById()));

app.listen(port, () => {
  console.log(
    `My Music App is listening on port ${port}. Press Ctrl-C to terminate...`
  );
});
