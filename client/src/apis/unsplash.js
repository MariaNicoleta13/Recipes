import axios from "axios";
export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID zlw-dzZ2e_kd-dODFNAlkjYyPGmcF_YffKYr-TjRBmk",
  },
});
