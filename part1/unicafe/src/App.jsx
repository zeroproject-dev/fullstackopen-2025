import { useState } from "react";
import "./App.css";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StadisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) return <p>No feedback given</p>;

  return (
    <>
      <h2>Stadistics</h2>
      <table>
        <tbody>
          <StadisticLine text="good" value={good} />
          <StadisticLine text="neutral" value={neutral} />
          <StadisticLine text="bad" value={bad} />
          <StadisticLine text="all" value={all} />
          <StadisticLine text="average" value={average || 0} />
          <StadisticLine text="positive" value={`${positive || 0} %`} />
        </tbody>
      </table>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <Button text="good" onClick={() => setGood(good + 1)} />
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" onClick={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
