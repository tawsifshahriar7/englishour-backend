const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");

const EntryTestSubmission = async (req, res) => {
  let results = req.body.results;
  let correct_count = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "correct") {
      correct_count++;
    }
  }
  let percentage = (correct_count / results.length) * 100;
  if (percentage >= 80) {
    res.status(status_codes.SUCCESS).json({
      suggested_level: 5,
    });
  } else if (percentage >= 60) {
    res.status(status_codes.SUCCESS).json({
      suggested_level: 4,
    });
  } else if (percentage >= 40) {
    res.status(status_codes.SUCCESS).json({
      suggested_level: 3,
    });
  } else if (percentage >= 20) {
    res.status(status_codes.SUCCESS).json({
      suggested_level: 2,
    });
  } else {
    res.status(status_codes.SUCCESS).json({
      suggested_level: 1,
    });
  }
};

module.exports = EntryTestSubmission;
