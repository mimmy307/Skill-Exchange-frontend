
import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: `${API_URL}/api`

});

const errorHandler = (err) => {
  throw err;
};

const getUser = (userId) => {
    const tokenFromStorage = localStorage.getItem("authToken")
  return api.get(`/users/${userId}`, {headers: {Authorization: `Bearer ${tokenFromStorage}`}})
    .then((res) => res.data)
    .catch(errorHandler);
};


const getUserSkills = (userId) =>{
    const tokenFromStorage = localStorage.getItem("authToken")
    return api.get(`/skills/user/${userId}`, {headers: {Authorization: `Bearer ${tokenFromStorage}`}})
    .then((res) => res.data)
    .catch(errorHandler)
}

const uploadImage = (file) => {
    const tokenFromStorage = localStorage.getItem("authToken")
  return api.post("/upload", file, {headers: {Authorization: `Bearer ${tokenFromStorage}`, "Content-Type":"multipart/form-data"}})
    .then(res => res.data)
    .catch(errorHandler);
};

const createSkill = (newSkill)=>{
    const tokenFromStorage = localStorage.getItem("authToken")
    return api.post("/skills", newSkill, {headers: {Authorization: `Bearer ${tokenFromStorage}`}})
    .then(res => res.data)
    .catch(errorHandler);
}



export default {
getUser,
getUserSkills,
uploadImage,
createSkill
};
