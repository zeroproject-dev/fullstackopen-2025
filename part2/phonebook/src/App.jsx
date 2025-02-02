import { useEffect, useState } from "react";
import "./App.css";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";

const Notification = ({ message }) => {
  if (!message?.message) {
    return null;
  }

  const className = message.success ? "success" : "error";
  return <div className={"notification " + className}>{message.message}</div>;
};

const confirmReplace = (person) =>
  !!person &&
  window.confirm(
    `${person.name} is already added to phonebook, replace the old number with a new one?`,
  );

const showMessage = (message, success, setMessage) => {
  setMessage({ message, success });

  setTimeout(() => {
    setMessage(null);
  }, 3000);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(setPersons);
  }, []);

  const handleSubmitPerson = (person) => {
    const personExists = persons.find((p) => p.name === person.name);
    if (confirmReplace(personExists)) {
      personService.update(personExists.id, person).then((updatedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== updatedPerson.id ? p : updatedPerson)),
        );
        showMessage(`Updated ${updatedPerson.name}`, true, setMessage);
      });
    } else if (!personExists) {
      personService.create(person).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        showMessage(`Added ${newPerson.name}`, true, setMessage);
      });
    }
  };

  const handleDeletePerson = (person) => {
    personService.delete(person.id).then(() => {
      setPersons(persons.filter((p) => p.id !== person.id));
    });
    showMessage(`Deleted ${person.name}`, true, setMessage);
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
      <Notification message={message} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmitPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
