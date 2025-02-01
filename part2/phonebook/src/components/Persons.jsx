const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

export const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((p) => (
        <Person key={p.name} person={p} />
      ))}
    </div>
  );
};
