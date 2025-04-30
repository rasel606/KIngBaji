import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

// Interceptor to attach token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('authToken')
console.log(token)
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Use Bearer token standard
  }
  return req;
});

// API Calls
export const verify = async () => {
  const token = localStorage.getItem("authToken");
  const response = await API.get("/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response);
  return response.data;
};

export const CreateUser = (data) => API.post("/createUser", data);
export const LoginUser =async (userId, password) => await API.post("/login_user", { userId, password });
export const UserAllDetails =async (userId) => await API.post("/user_details",{userId});
export const UpdateName = (name, userId) => API.post("/update-name", { name, userId });
export const UpdateBirthDate = (formData) => API.post("/update-birthday", formData);
export const searchTransactionsbyUserId = (data) => API.post("/searchTransactionsbyUserId", data);
export const UserHistory = (data) => API.post("/user-history", data);
export const verifyEmail = (formData) => API.post("/verify-email", formData);
export const Emailsend = (formData) => API.post("/send-otp", formData);
export const GatWaySystem = (data) => API.post("/subadmingetwaylistfor_user", data);
export const GetBettingHistoryByMember = ({range, member, product}) => API.get("/bettingHistory-member-summary", {range, member, product});
export const GetBettingHistoryByMemberDetails = ({params}) =>  API.get("/get-betting-history-detailed", {params});
export const GetPaymentMethodsUser = (paydata) => API.post("/deposit_with_bonus", paydata);
