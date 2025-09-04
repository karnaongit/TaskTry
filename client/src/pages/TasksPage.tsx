import React, { useState, useEffect } from 'react';
import { fetchTeams, fetchProjects, fetchTasks, createTask, updateTask, deleteTask } from '../api';
import { Team, Project, Task } from '../types';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import TaskForm from '../components/TaskForm';


export default function TasksPage() {
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [search, setSearch] = useState('');
const [projects, setProjects] = useState<Project[]>([]);
const [teams, setTeams] = useState<Team[]>([]);
const [tasks, setTasks] = useState<Task[]>([]);
const [totalPages, setTotalPages] = useState(1);
const [filterProject, setFilterProject] = useState<string | undefined>(undefined);
const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
const [editing, setEditing] = useState<Partial<Task> | null>(null);


const load = async () => {
const t = await fetchTeams(1, 100);
setTeams(t.data);
const p = await fetchProjects(1, 100);
setProjects(p.data);
const res = await fetchTasks({ page, limit, search, project: filterProject, status: filterStatus });
setTasks(res.data);
setTotalPages(res.totalPages);
};


useEffect(() => { load(); }, [page, search, filterProject, filterStatus]);


const onCreate = async (payload: Partial<Task>) => { await createTask(payload); setPage(1); await load(); };
const onUpdate = async (payload: Partial<Task>) => { if (!editing?._id) return; await updateTask(editing._id, payload); setEditing(null); await load(); };
const onDelete = async (id: string) => { if (!confirm('Delete task?')) return; await deleteTask(id); await load(); };

return (
<div>
<div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Tasks</h2></div>


<FilterBar search={search} setSearch={setSearch} extra={(
<div className="flex gap-2">
<select value={filterProject ?? ''} onChange={(e)=>setFilterProject(e.target.value || undefined)} className="px-2 py-2 border rounded">
<option value="">All Projects</option>
{projects.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
</select>
<select value={filterStatus ?? ''} onChange={(e)=>setFilterStatus(e.target.value || undefined)} className="px-2 py-2 border rounded">
<option value="">All Status</option>
<option value="to-do">To-do</option>
<option value="in-progress">In-progress</option>
<option value="done">Done</option>
<option value="cancelled">Cancelled</option>
</select>
</div>
)} />


<div className="grid grid-cols-3 gap-4">
<div className="col-span-2">
<div className="space-y-2">
{tasks.map(ts=> (
<div key={ts._id} className="p-3 bg-white border rounded">
<div className="flex justify-between items-start">
<div>
<div className="font-medium">{ts.title} <span className="text-sm text-gray-500">({ts.status})</span></div>
<div className="text-sm text-gray-700">{ts.description}</div>
<div className="text-sm text-gray-500 mt-1">Deadline: {new Date(ts.deadline).toLocaleDateString()}</div>
<div className="text-sm text-gray-500 mt-1">Project: {typeof ts.project === 'string' ? ts.project : ts.project.name}</div>
<div className="text-sm text-gray-500 mt-1">Assigned: {(ts.assignedMembers||[]).map((m:any)=> typeof m==='string'?m: m.name).join(', ')}</div>
</div>
<div className="flex gap-2">
<button onClick={()=>setEditing(ts)} className="px-3 py-1 border rounded">Edit</button>
<button onClick={()=>onDelete(ts._id)} className="px-3 py-1 border rounded">Delete</button>
</div>
</div>
</div>
))}
</div>
<Pagination page={page} totalPages={totalPages} onChange={setPage} />
</div>


<div>
<h3 className="text-lg font-medium mb-2">{editing ? 'Edit Task' : 'Add Task'}</h3>
<TaskForm initial={editing ?? undefined} projects={projects} teams={teams} onSubmit={editing ? onUpdate : onCreate} onCancel={()=>setEditing(null)} />
</div>
</div>
</div>
);
}