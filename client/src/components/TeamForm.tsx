import React, { useState, useEffect } from 'react';
import { Team, TeamInput } from '../types';

interface Props {
  initial?: Partial<Team>;
  onSubmit: (p: TeamInput) => Promise<void>;
  onCancel?: () => void;
}

export default function TeamForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<TeamInput>({
    name: initial?.name ?? '',
    email: initial?.email ?? '',
    designation: initial?.designation ?? '',
  });

  // Only update state when initial actually changes (e.g., user clicks "Edit")
  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name ?? '',
        email: initial.email ?? '',
        designation: initial.designation ?? '',
      });
    }
  }, [initial?._id]); // 👈 depend only on the id of the item being edited

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
          placeholder="Name"
          className="px-2 py-2 border rounded"
        />
        <input
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="px-2 py-2 border rounded"
        />
        <input
          required
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          placeholder="Designation"
          className="px-2 py-2 border rounded"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1 bg-blue-600 text-white rounded">
          Save
        </button>
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
