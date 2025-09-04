import React from 'react';


interface Props {
search: string;
setSearch: (s: string) => void;
extra?: React.ReactNode;
}


export default function FilterBar({ search, setSearch, extra }: Props) {
return (
<div className="flex gap-3 mb-4 items-center">
<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="px-3 py-2 border rounded w-full" />
{extra}
</div>
);
}