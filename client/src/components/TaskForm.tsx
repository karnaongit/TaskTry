import React, { useState, useEffect } from 'react';
import { Task, TaskInput, Project, Team, TaskStatus } from '../types';

interface Props {
  initial?: Partial<Task>;
  projects: Project[];
  teams: Team[];
  onSubmit: (t: TaskInput) => Promise<void>;
  onCancel?: () => void;
}

export default function TaskForm({ initial, projects, teams, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<TaskInput>({
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    deadline: initial?.deadline ?? '',
    project: typeof initial?.project === 'string' ? initial.project : (initial?.project as Project)?._id ?? '',
    assignedMembers: (initial?.assignedMembers as string[]) ?? [],
    status: initial?.status ?? 'to-do',
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title ?? '',
        description: initial.description ?? '',
        deadline: initial.deadline ?? '',
        project: typeof initial.project === 'string' ? initial.project : (initial.project as Project)?._id ?? '',
        assignedMembers: (initial.assignedMembers as string[]) ?? [],
        status: initial.status ?? 'to-do',
      });
    }
  }, [initial?._id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="p-4 border rounded bg-white">
      <div className="grid grid-cols-1 gap-2">
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Task Title"
          className="px-2 py-2 border rounded"
        />
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="px-2 py-2 border rounded"
        />
        <input
          type="date"
          required
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="px-2 py-2 border rounded"
        />
        <select
          required
          value={form.project as string}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          className="px-2 py-2 border rounded"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          multiple
          value={form.assignedMembers as string[]}
          onChange={(e) =>
            setForm({
              ...form,
              assignedMembers: Array.from(e.target.selectedOptions, (opt) => opt.value),
            })
          }
          className="px-2 py-2 border rounded"
        >
          {teams.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
          className="px-2 py-2 border rounded"
        >
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
