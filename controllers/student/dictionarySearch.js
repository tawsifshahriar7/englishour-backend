const { json } = require("express/lib/response");
const Dictionary = require("../../model/dictionary");
const status_codes = require("../../utils/status_code/status_code");

const wordData = async (req, res) => {
  let profile_id = parseInt(req.profile.profile_id);
  let word = req.query.word;
  Dictionary.findOne({
    where: {
      word: word,
    },
  })
    .then((data) => {
      if (data) {
        res.status(status_codes.SUCCESS).json(data.dataValues);
      } else {
        res.status(status_codes.DATA_NOT_FOUND).json({
          message: "Word not found",
        });
      }
    })
    .catch((err) => {
      res.status(status_codes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    });
};

module.exports = wordData;
