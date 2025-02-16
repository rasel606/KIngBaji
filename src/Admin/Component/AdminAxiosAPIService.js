import axios from "axios";


const token = localStorage.getItem("token")
const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  if (token) req.headers.Authorization = `${token}`;
  return req;
});

export const verify = async (token) => {
    const response = await axios.get(`http://localhost:5000/api/v1/verify`, {
      headers: { Authorization: token,
        'Content-Type': 'application/json'
       }
    });
    return response.data;
  };

export const CreateUser = (data) => API.post("/createUser",data);
export const LoginUser = (userId,password) => API.post("/login", userId,password);
export const UpdateName = (name,userId) => API.post("/update-name", name,userId,{token});
export const UpdateBirthDate = (formData) => API.post("/update-birthday", formData,{token});
export const verifyEmail = (formData) => API.post("verify-email", formData,{token});
export const Emailsend = (formData) => API.post("send-otp", formData,{token});
