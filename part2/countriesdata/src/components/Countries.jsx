const Country = ({ country }) => {
  const languages = Object.values(country.languages);

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
      <img src={country.flags.png} alt={country.flags.alt} width="100" />
    </div>
  );
};

export const Countries = ({ countries }) => {
  if (countries.length === 0) return <div>No countries found</div>;
  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.official}>{country.name.common}</div>
      ))}
    </div>
  );
};
