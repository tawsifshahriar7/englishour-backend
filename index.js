const http = require("http");
const app = require("./app");
const server = http.createServer(app);
// const Sequelize = require("sequelize");

const db = require("./config/database");

db.authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
db.sync({ force: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
