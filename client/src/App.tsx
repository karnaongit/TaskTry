import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TeamsPage from './pages/TeamsPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';


export default function App(){
return (
<Routes>
<Route element={<Layout/>} path="/">
<Route index element={<Navigate to="/teams" replace/>} />
<Route path="teams" element={<TeamsPage/>} />
<Route path="projects" element={<ProjectsPage/>} />
<Route path="tasks" element={<TasksPage/>} />
</Route>
</Routes>
);
}