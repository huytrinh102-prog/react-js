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
const getALLapi = () => {
  return axios.get("api/v1/participant/all");
};
export { postCreateNewUser, getALLapi };
