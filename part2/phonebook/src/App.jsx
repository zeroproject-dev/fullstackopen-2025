import { useEffect, useState } from "react";
import "./App.css";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.then(setPersons);
  }, []);

  const handleSubmitPerson = (person) => {
    if (persons.find((p) => p.name === person.name)) {
      alert(`${person.name} is already added to phonebook`);
      return;
    }

    personService.create(person).then((newPerson) => {
      setPersons(persons.concat(newPerson));
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmitPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
