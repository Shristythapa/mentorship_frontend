import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//make seperate header for authorization
const token = localStorage.getItem("token");
const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

export const createMenteeSignupApi = (data) => Api.post("/mentee/signup", data);
export const createMentorSignupApi = (data) => Api.post("/mentor/signup", data);
export const loginMenteeApi = (data) => Api.post("/mentee/login", data);
export const loginMentorApi = (data) => Api.post("/mentor/login", data);

export const createSessionApi = (data) =>
  Api.post("/session/create", data, config);
export const getAllSessionsApi = () => Api.get("/session/getAllSessions");
export const deleteSessionApi = (id) =>
  Api.delete(`/session/deleteSession/${id}`, config);

export const getSessionById = (id) => Api.get(`/session/getSessionById/${id}`);

export const joinSession = (id, data) =>
  Api.put(`/session/joinSession/${id}`, data, config);

export const getAllMentorsApi = () => Api.get("/mentor/getAllMentors");
export const getSessionsOfMentor = (id) =>
  Api.get(`/session/mentorSessions/${id}`);

export const findMentorByEmail = (email) =>
  Api.get(`/mentor/findByEmail/${email}`);

export const getMentorSession = (data) =>
  Api.get("/session/mentorSessions", data);

export const getMentorProfile = (email) =>
  Api.get(`/session/getMentorProfile/${email}`);

export const getMentorById = (id) => Api.get(`/mentor/getMentorById/${id}`);

export const createArticle = (data) =>
  Api.post("/article/createArticle", data, config);
export const getAllArticle = () => Api.get("/article/findAllArticles");
export const deleteArticel = (data) =>
  Api.post(`/article/delteArticle/${data}`, config);
export const forgotPasswordMentor = (data) =>
  Api.post("/mentor/forgotPassword", data);

export const updateMentorPassword = (id, token, data) =>
  Api.post(`mentor/updatePassword/${id}/${token}`, data);

export const forgotPasswordMentee = (data) =>
  Api.post("/mentee/forgotPassword", data);
export const startCall = (id) => Api.put(`/session/startSession/${id}`);
export const endCall = (id) => Api.put(`/session/endCall/${id}`);
