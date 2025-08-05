import api from "./index";

export const getTodos = () => api.get("/todos");
export const createTodo = (data) => api.post("/todos", data);
export const searchTodo = (keyword) => api.get(`/todos/search?keyword=${keyword}`);
export const uploadFile = (formData) => api.post("/upload", formData);
