import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';


export default function Layout() {
const loc = useLocation();
return (
<div className="min-h-screen">
<header className="bg-white shadow">
<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
<h1 className="text-xl font-semibold">Task Manager</h1>
<nav className="space-x-4">
<Link className={`px-3 py-1 ${loc.pathname.includes('/teams') ? 'bg-gray-100 rounded' : ''}`} to="/teams">Teams</Link>
<Link className={`px-3 py-1 ${loc.pathname.includes('/projects') ? 'bg-gray-100 rounded' : ''}`} to="/projects">Projects</Link>
<Link className={`px-3 py-1 ${loc.pathname.includes('/tasks') ? 'bg-gray-100 rounded' : ''}`} to="/tasks">Tasks</Link>
</nav>
</div>
</header>
<main className="max-w-6xl mx-auto p-4">
<Outlet />
</main>
</div>
);
}