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
  return axios.put(`api/v1/participant`, Data);
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
const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email, password });
};
const postRegister = (email, password, userName) => {
  return axios.post(`/api/v1/register`, { email, password, userName });
};
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
const getQuestiondata = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};
const submitQuestionQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, data);
};
const postQuiz = (description, name, difficulty, quizImage) => {
  const Data = new FormData();
  Data.append("description", description);
  Data.append("name", name);
  Data.append("difficulty", difficulty);
  Data.append("quizImage", quizImage);
  return axios.post(`/api/v1/quiz`, Data);
};
const getQuizbyAdmin = () => {
  return axios.get(`/api/v1/quiz/all`);
};
const DeleteQuizbyAdmin = (quizId) => {
  return axios.delete(`/api/v1/quiz/${quizId}`, { data: { id: quizId } });
};
const EditQuizbyAdmin = (id, description, name, difficulty, quizImage) => {
  const Data = new FormData();
  Data.append("id", id);
  Data.append("description", description);
  Data.append("name", name);
  Data.append("difficulty", difficulty);
  Data.append("quizImage", quizImage);
  return axios.put(`/api/v1/quiz`, Data);
};
const CreateNewQforQuiz = (quiz_id, description, questionImage) => {
  const Data = new FormData();
  Data.append("quiz_id", quiz_id);
  Data.append("description", description);
  // Backend expects a file for questionImage. Avoid sending empty string/base64.
  if (questionImage instanceof File) {
    Data.append("questionImage", questionImage);
  }

  return axios.post(`/api/v1/question`, Data);
};
const CreateNewAforQ = (description, correct_answer, question_id) => {
  return axios.post(`/api/v1/answer`, {
    description,
    correct_answer,
    question_id,
  });
};
const PostAssignQuiz = (quizId, userId) => {
  return axios.post(`/api/v1/quiz-assign-to-user`, { quizId, userId });
};
const getQuizwithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const upsertQuiz = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};
const Logout = (email, refresh_token) => {
  return axios.post(`api/v1/logout`, { email, refresh_token });
};
const DashBoardData = () => {
  return axios.get(`api/v1/overview`);
};
const UpdateProfile = (username, userImage) => {
  const Data = new FormData();
  Data.append("username", username);
  if (userImage instanceof File) {
    Data.append("userImage", userImage);
  }
  return axios.post(`/api/v1/profile`, Data);
};
export {
  putUpdateUser,
  postCreateNewUser,
  getALLapi,
  DeleteUser,
  getALLapiUserwithpaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getQuestiondata,
  submitQuestionQuiz,
  postQuiz,
  getQuizbyAdmin,
  DeleteQuizbyAdmin,
  EditQuizbyAdmin,
  CreateNewQforQuiz,
  CreateNewAforQ,
  PostAssignQuiz,
  getQuizwithQA,
  upsertQuiz,
  Logout,
  DashBoardData,
  UpdateProfile,
};
