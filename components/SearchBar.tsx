type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <span className="text-sm text-slate-500">⌕</span>
      <input
        id="job-search"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Job title or keyword"
        className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
      />
    </div>
  );
}
