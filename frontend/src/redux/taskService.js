import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks";

// Register Task
const register = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  console.log(response.data)
  return response.data;
  
};

// Get Tasks
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Edit Task
const editTask = async (taskData) => {
  const response = await axios.put(`${API_URL}/${taskData.id}`, taskData);
  return response.data;
};

// Delete Task
const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/${taskId}`);
  return response.data;
};

const taskService = {
  register,
  getTasks,
  editTask,
  deleteTask,
};

export default taskService;
