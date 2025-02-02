import { useEffect, useState } from "react";
import { Countries } from "./components/Countries";
import countryService from "./services/country";

function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);

  const handleNameChange = (event) => {
    const name = event.target.value;
    setName(name);
  };

  useEffect(() => {
    countryService.getAll().then(setCountries);
  }, []);

  const newCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(name.toLowerCase()),
  );

  return (
    <div>
      <p>
        Find countries{" "}
        <input type="text" value={name} onChange={handleNameChange} />
      </p>

      <Countries countries={newCountries} />
    </div>
  );
}

export default App;
