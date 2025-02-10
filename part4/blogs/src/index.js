const app = require("./app");
const config = require("./utils/config");

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
