import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchTasks = async (token) => {
  return await axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
};

export const addTask = async (task, token) => {
  return await axios.post(`${API_URL}/tasks`, task, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateTask = async (taskId, updatedData, token) => {
  return await axios.put(`${API_URL}/tasks/${taskId}`, updatedData, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteTask = async (taskId, token) => {
  return await axios.delete(`${API_URL}/tasks/${taskId}`, { headers: { Authorization: `Bearer ${token}` } });
};
