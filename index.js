const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const db = require("./config/database");
const Exercise = require("./model/exercise");

db.authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
db.sync({ logging: console.log, force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
