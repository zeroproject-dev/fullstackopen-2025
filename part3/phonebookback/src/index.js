require("dotenv").config();

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  if (req.method === "POST") return JSON.stringify(req.body);
  return "No Content";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (_, res) => {
  res.send("<h1>Hi! 😼</h1>");
});

//INFO: Persons CRUD
app.get("/api/persons", (_, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).end();
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  if (isNaN(Number(id)))
    return res.status(400).json({ error: "Error formatting the id" });

  persons = persons.filter((person) => person.id !== Number(id));

  res.status(204).end();
});

const generateId = (n = 1000) => {
  let id = Math.floor(Math.random() * n);
  while (persons.some((person) => person.id === id)) {
    id = Math.floor(Math.random() * n);
  }
  return id;
};

const isUniqueName = (name) =>
  persons.some((person) => person.name.toLowerCase() === name.toLowerCase());

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body?.name || !body?.number) {
    return res.status(400).json({ error: "Missing name or number" });
  }

  // INFO: for later
  // if (isUniqueName(body.name)) {
  //   return res.status(400).json({ error: "Name must be unique" });
  // }

  Person(body)
    .save()
    .then((person) => {
      res.json(person);
    });
});
//INFO: End persons CRUD

app.get("/api/info", (req, res) => {
  Person.countDocuments({}).then((count) => {
    res.send(
      `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`,
    );
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
