export const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={onChange} />
    </div>
  );
};
