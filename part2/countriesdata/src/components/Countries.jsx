import weatherService from "../services/weather";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);

  useEffect(() => {
    weatherService.getWeather(country.latlng).then(setWeather);
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      {country.capital.map((capital) => (
        <p key={capital}>capital: {capital}</p>
      ))}
      Area: {country.area} km²
      <br />
      <h3>Languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        width="100"
        height="62"
      />
      <h3>Weather in {country.name.common}</h3>
      <p>Temperature: {weather?.main?.temp ?? "Error"}</p>
      <img
        width="100"
        height="100"
        src={weatherService.getWeatherIconUrl(weather?.weather?.[0]?.icon)}
        alt="weather icon"
      />
      <p>Wind: {weather?.wind?.speed} m/s</p>
    </div>
  );
};

const CountryListItem = ({ country, onClick }) => {
  const handleShowCountry = () => {
    onClick(country);
  };

  return (
    <div>
      {country.name.common} <button onClick={handleShowCountry}>Show</button>
    </div>
  );
};

export const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setSelectedCountry(null);
  }, [countries]);

  if (countries.length === 0) return <div>No countries found</div>;
  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  if (selectedCountry) {
    return (
      <>
        <button type="button" onClick={() => setSelectedCountry(null)}>
          {"<-"}
        </button>
        <Country country={selectedCountry} />
      </>
    );
  }

  return (
    <div>
      {countries.map((country) => (
        <CountryListItem
          key={country.name.official}
          country={country}
          onClick={setSelectedCountry}
        />
      ))}
    </div>
  );
};
