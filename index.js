const http = require("http");
const app = require("./app");
const server = http.createServer(app);

// const Sequelize = require("sequelize");
const User = require("./model/user");
const Profile = require("./model/profile");
const Dictionary = require("./model/dictionary");
const Moderator = require("./model/moderator");
const ProfileNotification = require("./model/profile_notification");
const ProfileNotificationStatus = require("./model/profile_notification_status");
const ModeratorNotification = require("./model/moderator_notification");
const ModeratorNotificationStatus = require("./model/moderator_notification_status");
const Topic = require("./model/topic");
const Tutorial = require("./model/tutorial");
const Exercise = require("./model/exercise");
const TopicHistory = require("./model/topic_history");
const Item = require("./model/item");
const ReadComplete = require("./model/readcomplete");
const Sentence = require("./model/sentence");
const LetterChange = require("./model/letterchange");
const SentenceShuffle = require("./model/sentenceshuffle");
const GroupWords = require("./model/groupwords");
const GroupWordsHistory = require("./model/groupwordshistory");
const ReadCompleteHistory = require("./model/readcompletehistory");
const SearchHistory = require("./model/searchhistory");
const Category = require("./model/category");
const AttemptHistory = require("./model/history");
const Words = require("./model/words");

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
