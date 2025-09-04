import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import TeamForm from '../components/TeamForm';
import { fetchTeams, createTeam, updateTeam, deleteTeam } from '../api';
import { Team } from '../types';


export default function TeamsPage() {
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [search, setSearch] = useState('');
const [teams, setTeams] = useState<Team[]>([]);
const [totalPages, setTotalPages] = useState(1);
const [editing, setEditing] = useState<Partial<Team> | null>(null);


const load = async () => {
const res = await fetchTeams(page, limit, search);
setTeams(res.data);
setTotalPages(res.totalPages);
};


useEffect(() => { load(); }, [page, search]);


const onCreate = async (payload: Partial<Team>) => { await createTeam(payload); setPage(1); await load(); };
const onUpdate = async (payload: Partial<Team>) => { if (!editing?._id) return; await updateTeam(editing._id, payload); setEditing(null); await load(); };
const onDelete = async (id: string) => { if (!confirm('Delete?')) return; await deleteTeam(id); await load(); };

return (
<div>
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-semibold">Teams</h2>
</div>


<FilterBar search={search} setSearch={setSearch} />


<div className="grid grid-cols-3 gap-4">
<div className="col-span-2">
<div className="space-y-2">
{teams.map(t => (
<div key={t._id} className="p-3 bg-white border rounded flex justify-between items-center">
<div>
<div className="font-medium">{t.name}</div>
<div className="text-sm text-gray-600">{t.email} • {t.designation}</div>
</div>
<div className="flex gap-2">
<button onClick={() => setEditing(t)} className="px-3 py-1 border rounded">Edit</button>
<button onClick={() => onDelete(t._id)} className="px-3 py-1 border rounded">Delete</button>
</div>
</div>
))}
</div>


<Pagination page={page} totalPages={totalPages} onChange={setPage} />
</div>


<div>
<h3 className="text-lg font-medium mb-2">{editing ? 'Edit Team' : 'Add Team'}</h3>
<TeamForm initial={editing ?? undefined} onSubmit={editing ? onUpdate : onCreate} onCancel={() => setEditing(null)} />
</div>
</div>
</div>
);
}