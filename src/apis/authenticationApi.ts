import axios from "axios";

const loginWithSpotify = async () => {
  const response = await axios.get("http://localhost:5000/login");
  return response;
};

const getAccessToken = async() => {
  const response = await axios.get("http://localhost:5000/token");
  return response;
}

const authenticationApi = {
  loginWithSpotify: loginWithSpotify,
  getAccessToken: getAccessToken
};

export default authenticationApi;
