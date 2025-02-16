import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/";

export const getNews = () => axios.get(`${API_URL}/news`);
export const getNewsById = (id) => axios.get(`${API_URL}/news/${id}`);
export const createNews = (data) => axios.post(`${API_URL}/news`, data);
export const updateNews = (id, data) =>
  axios.put(`${API_URL}/news/${id}`, data);
