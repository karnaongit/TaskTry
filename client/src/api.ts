import axios from 'axios';
import { Team, Project, Task, PaginatedResponse } from './types';


const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000' });


// Teams
export const fetchTeams = async (page: number, limit: number, search?: string): Promise<PaginatedResponse<Team>> => {
  const res = await api.get('/api/teams', { params: { page, limit, search } });
  const totalPages = Math.ceil(res.data.total / limit);
  return { ...res.data, totalPages };
};
export const createTeam = (payload: Partial<Team>) => api.post('/api/teams', payload).then((r) => r.data);
export const updateTeam = (id: string, payload: Partial<Team>) => api.put(`/api/teams/${id}`, payload).then((r) => r.data);
export const deleteTeam = (id: string) => api.delete(`/api/teams/${id}`).then((r) => r.data);


// Projects
export const fetchProjects = async (page: number, limit: number, search?: string): Promise<PaginatedResponse<Project>> => {
  const res = await api.get('/api/projects', { params: { page, limit, search } });
  const totalPages = Math.ceil(res.data.total / limit);
  return { ...res.data, totalPages };
};
export const createProject = (payload: Partial<Project>) => api.post('/api/projects', payload).then((r) => r.data);
export const updateProject = (id: string, payload: Partial<Project>) => api.put(`/api/projects/${id}`, payload).then((r) => r.data);
export const deleteProject = (id: string) => api.delete(`/api/projects/${id}`).then((r) => r.data);


// Tasks
export const fetchTasks = async (params: {
  page: number; limit: number; search?: string; project?: string; status?: string;
}): Promise<PaginatedResponse<Task>> => {
  const res = await api.get('/api/tasks', { params });
  const totalPages = Math.ceil(res.data.total / params.limit);
  return { ...res.data, totalPages };
};
export const createTask = (payload: Partial<Task>) => api.post('/api/tasks', payload).then((r) => r.data);
export const updateTask = (id: string, payload: Partial<Task>) => api.put(`/api/tasks/${id}`, payload).then((r) => r.data);
export const deleteTask = (id: string) => api.delete(`/api/tasks/${id}`).then((r) => r.data);


export default api;