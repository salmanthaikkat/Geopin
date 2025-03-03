import axios from "axios";

const host = "https://geopin-backend.herokuapp.com/api";
//const host = "http://localhost:8080/api";

export const setToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const call = async (method, path, data) => {
  const response = await axios[method](`${host}/${path}`, data);
  return response.data;
};

export default { call };
