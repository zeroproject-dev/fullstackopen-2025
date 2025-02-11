const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

module.exports = unknownEndpoint;
