const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("[USAGE] node mongo.js <password>");
  console.log("[USAGE] node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://zero:${password}@cluster0.ghogg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({})
    .then((result) => {
      console.log("Phonebook:");
      result?.forEach(({ name, number }) => {
        console.log(`${name} ${number}`);
      });
      mongoose.connection.close();
      process.exit(0);
    })
    .catch((error) => {
      console.log(error);
      mongoose.connection.close();
      process.exit(1);
    });
} else {
  if (process.argv.length < 5) {
    console.log("[USAGE] node mongo.js <password>");
    console.log("[USAGE] node mongo.js <password> <name> <number>");
    process.exit(1);
  }

  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  newPerson.save().then(({ name, number }) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
