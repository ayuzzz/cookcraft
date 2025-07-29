type FilterProps ={
    options: string[],
    onChange: (value: string) => void;
    name: string;
    id: string;
    className?: string;
}

export default function FilterDropdown({options, onChange, name, id, className}: FilterProps) {
  return (
    <select name={name} id={id} onChange={e => onChange(e.target.value)} className={className}>
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  );
}