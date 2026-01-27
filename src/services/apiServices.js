// import { data } from "react-router-dom";
import axios from "../ultils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, image) => {
  const Data = new FormData();
  Data.append("email", email);
  Data.append("password", password);
  Data.append("username", username);
  Data.append("role", role);
  Data.append("userImage", image);
  return axios.post("api/v1/participant", Data);
};
const putUpdateUser = (id, username, role, image) => {
  const Data = new FormData();
  Data.append("id", id);
  Data.append("username", username);
  Data.append("role", role);
  if (image) {
    Data.append("userImage", image);
  }
  return axios.put(`api/v1/participant`, Data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

const getALLapi = () => {
  return axios.get("api/v1/participant/all");
};
const DeleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getALLapiUserwithpaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
export {
  putUpdateUser,
  postCreateNewUser,
  getALLapi,
  DeleteUser,
  getALLapiUserwithpaginate,
};
