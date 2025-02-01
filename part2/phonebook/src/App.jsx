import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleSubmitPerson = (e) => {
    e.preventDefault();

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, phone: newPhone }));
    setNewName("");
    setNewPhone("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitPerson}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone:
          <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((p) => (
          <p key={p.name}>
            {p.name} {p.phone}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
