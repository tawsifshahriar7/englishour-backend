const http = require("http");
const app = require("./app");
const server = http.createServer(app);
// const Sequelize = require("sequelize");
const User = require("./model/user");
const Profile = require("./model/profile");
const Dictionary = require("./model/dictionary");
const Moderator = require("./model/moderator");
const ProfileNotification = require("./model/profileNotification");
const ProfileNotificationStatus = require("./model/profileNotificationStatus");
const ModeratorNotification = require("./model/moderatorNotification");
const ModeratorNotificationStatus = require("./model/moderatorNotificationStatus");
const Topic = require("./model/topic");
const Tutorial = require("./model/tutorial");
const Exercise = require("./model/exercise");
const TopicHistory = require("./model/topicHistory");
const Item = require("./model/item");
const ReadComplete = require("./model/readComplete");
const Sentence = require("./model/sentence");
const LetterChange = require("./model/letterchange");
const SentenceShuffle = require("./model/sentenceshuffle");

const db = require("./config/database");

db.authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
db.sync({ logging: console.log, force: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
// User.sync({ logging: console.log, force: true })
//   .then(() => {
//     console.log("User table created");
//   })
//   .catch((err) => {
//     console.log("Error: " + err);
//   });
// Profile.sync({ logging: console.log, force: true })
//   .then(() => {
//     console.log("Profile table created");
//   })
//   .catch((err) => {
//     console.log("Error: " + err);
//   });
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
