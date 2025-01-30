const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, idx) => (
        <Part part={part} key={idx} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((val, curr) => val + curr.exercises, 0);

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
