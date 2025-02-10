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

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      if (person !== null) res.json(person);
      else res.status(404).end();
    })
    .catch(next);
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  if (!body?.name || !body?.number) {
    return res.status(400).json({ error: "Missing name or number" });
  }

  Person.findByIdAndUpdate(
    id,
    {
      name: body.name,
      number: body.number,
    },
    { new: true },
  )
    .then((updatedPerson) => {
      if (updatedPerson !== null) res.json(updatedPerson);
      else res.status(404).end();
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch(next);
});

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

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, _, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
