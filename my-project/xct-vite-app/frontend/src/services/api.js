import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchTodos = () => axios.get(`${BASE_URL}/todos`);
export const addTodo = (todo) => axios.post(`${BASE_URL}/todos`, todo);
export const updateTodo = (id, todo) => axios.put(`${BASE_URL}/todos/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/todos/${id}`);
export const uploadFile = (formData) =>
  axios.post(`${BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const searchTodos = (keyword) =>
  axios.get(`${BASE_URL}/search`, { params: { q: keyword } });
