import axios from "axios";

const getAll = async () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const create = async (person) => {
  return axios
    .post("http://localhost:3001/persons", person)
    .then((response) => response.data);
};

const update = async (id, person) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, person)
    .then((response) => response.data);
};

const deletePerson = async (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  delete: deletePerson,
};
