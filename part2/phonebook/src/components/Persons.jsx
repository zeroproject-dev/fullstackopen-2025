const Person = ({ person, onDelete }) => {
  const handleDelete = () => {
    window.confirm(`Delete ${person.name}?`) && onDelete(person);
  };

  return (
    <p>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </p>
  );
};

export const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((p) => (
        <Person key={p.id} person={p} onDelete={onDelete} />
      ))}
    </div>
  );
};
