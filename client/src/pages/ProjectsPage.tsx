import React, { useState, useEffect } from 'react';
import { fetchTeams, fetchProjects, createProject, updateProject, deleteProject } from '../api';
import { Team, Project } from '../types';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import ProjectForm from '../components/ProjectForm';


export default function ProjectsPage() {
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [search, setSearch] = useState('');
const [projects, setProjects] = useState<Project[]>([]);
const [teams, setTeams] = useState<Team[]>([]);
const [totalPages, setTotalPages] = useState(1);
const [editing, setEditing] = useState<Partial<Project> | null>(null);


const load = async () => {
const t = await fetchTeams(1, 100);
setTeams(t.data);
const p = await fetchProjects(page, limit, search);
setProjects(p.data);
setTotalPages(p.totalPages);
};


useEffect(() => { load(); }, [page, search]);


const onCreate = async (payload: Partial<Project>) => { await createProject(payload); setPage(1); await load(); };
const onUpdate = async (payload: Partial<Project>) => { if (!editing?._id) return; await updateProject(editing._id, payload); setEditing(null); await load(); };
const onDelete = async (id: string) => { if (!confirm('Delete project?')) return; await deleteProject(id); await load(); };

return (
<div>
<div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Projects</h2></div>
<FilterBar search={search} setSearch={setSearch} />


<div className="grid grid-cols-3 gap-4">
<div className="col-span-2">
<div className="space-y-2">
{projects.map(p => (
<div key={p._id} className="p-3 bg-white border rounded">
<div className="flex justify-between items-start">
<div>
<div className="font-medium">{p.name}</div>
<div className="text-sm text-gray-700">{p.description}</div>
<div className="text-sm text-gray-500 mt-2">Members: {(p.teamMembers || []).map((m:any)=> typeof m==='string'?m: m.name).join(', ')}</div>
</div>
<div className="flex gap-2">
<button onClick={() => setEditing(p)} className="px-3 py-1 border rounded">Edit</button>
<button onClick={() => onDelete(p._id)} className="px-3 py-1 border rounded">Delete</button>
</div>
</div>
</div>
))}
</div>
<Pagination page={page} totalPages={totalPages} onChange={setPage} />
</div>


<div>
<h3 className="text-lg font-medium mb-2">{editing ? 'Edit Project' : 'Add Project'}</h3>
<ProjectForm initial={editing ?? undefined} teams={teams} onSubmit={editing ? onUpdate : onCreate} onCancel={() => setEditing(null)} />
</div>
</div>
</div>
);
}