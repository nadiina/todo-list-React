import api from "../api/axios.js";

export const getTasks = async () => {
    const response = await api.get('tasks/');
    return response.data;
};