import React from 'react';


interface Props {
page: number;
totalPages: number;
onChange: (p: number) => void;
}


export default function Pagination({ page, totalPages, onChange }: Props) {
if (totalPages <= 1) return null;
return (
<div className="flex items-center gap-2 mt-4">
<button onClick={() => onChange(1)} disabled={page === 1} className="px-2 py-1 bg-white border rounded">First</button>
<button onClick={() => onChange(page - 1)} disabled={page === 1} className="px-2 py-1 bg-white border rounded">Prev</button>
<span className="px-3">{page} / {totalPages}</span>
<button onClick={() => onChange(page + 1)} disabled={page === totalPages} className="px-2 py-1 bg-white border rounded">Next</button>
<button onClick={() => onChange(totalPages)} disabled={page === totalPages} className="px-2 py-1 bg-white border rounded">Last</button>
</div>
);
}