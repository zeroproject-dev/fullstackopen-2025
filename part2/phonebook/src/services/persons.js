import axios from "axios";

const baseUrl = "/api";

const getAll = async () => {
  return axios.get(`${baseUrl}/persons`).then((response) => response.data);
};

const create = async (person) => {
  return axios
    .post(`${baseUrl}/persons`, person)
    .then((response) => response.data);
};

const update = async (id, person) => {
  return axios
    .put(`${baseUrl}/persons/${id}`, person)
    .then((response) => response.data);
};

const deletePerson = async (id) => {
  return axios
    .delete(`${baseUrl}/persons/${id}`)
    .then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  delete: deletePerson,
};
