import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  return axios.get(`${baseUrl}/all`).then((response) => response.data);
};

const search = async (name) => {
  return axios.get(`${baseUrl}/name/${name}`).then((response) => response.data);
};

export default { getAll, search };
