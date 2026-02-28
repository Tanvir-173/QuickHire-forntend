type FilterBarProps = {
  location: string;
  setLocation: (value: string) => void;
};

const LOCATION_OPTIONS = ["Remote", "Dhaka", "Chittagong", "Sylhet"];

export default function FilterBar({
  location,
  setLocation,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <span className="text-sm text-slate-500">⌖</span>
      <select
        id="location-filter"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        className="w-full appearance-none border-0 bg-transparent text-sm text-slate-700 outline-none"
      >
        <option value="">Florence, Italy</option>
        {LOCATION_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
