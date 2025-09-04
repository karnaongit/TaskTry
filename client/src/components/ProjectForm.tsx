import React, { useState, useEffect } from 'react';
import { Project, ProjectInput, Team } from '../types';

interface Props {
  initial?: Partial<Project>;
  teams: Team[];
  onSubmit: (p: ProjectInput) => Promise<void>;
  onCancel?: () => void;
}

export default function ProjectForm({ initial, teams, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<ProjectInput>({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    teamMembers: initial?.teamMembers ?? [],
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name ?? '',
        description: initial.description ?? '',
        teamMembers: initial.teamMembers ?? [],
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
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Project Name"
          className="px-2 py-2 border rounded"
        />
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="px-2 py-2 border rounded"
        />
        <select
          multiple
          value={form.teamMembers as string[]}
          onChange={(e) =>
            setForm({
              ...form,
              teamMembers: Array.from(e.target.selectedOptions, (opt) => opt.value),
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
