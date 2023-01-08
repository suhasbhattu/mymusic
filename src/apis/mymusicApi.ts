import axios from "axios";

const getPlaylists = async () => {
  const response = await axios.get("http://localhost:5000/playlists");
  return response;
};

const getPlaylistById = async (id: string) => {
  const response = await axios.get(`http://localhost:5000/playlists/${id}`);
  return response;
};

const mymusicApi = {
  getPlaylists: getPlaylists,
  getPlaylistById: getPlaylistById,
};

export default mymusicApi;
