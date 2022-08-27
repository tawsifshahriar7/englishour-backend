const { json } = require("express/lib/response");
const status_codes = require("../../utils/status_code/status_code");
const AttemptHistory = require("../../model/history");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const getStats = async (req, res) => {
  let profile_id = req.profile.profile_id;
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  let todayCount = await AttemptHistory.count({
    where: {
      profile_id: profile_id,
      status: "solved",
      date: {
        [Op.between]: [
          new Date(year + "-" + month + "-" + date + " 00:00:00"),
          new Date(year + "-" + month + "-" + date + " 23:59:59"),
        ],
      },
    },
  });
  let yesterdayCount = await AttemptHistory.count({
    where: {
      profile_id: profile_id,
      status: "solved",
      date: {
        [Op.between]: [
          new Date(year + "-" + month + "-" + (date - 1) + " 00:00:00"),
          new Date(year + "-" + month + "-" + (date - 1) + " 23:59:59"),
        ],
      },
    },
  });
  let lastWeekCount = await AttemptHistory.count({
    where: {
      profile_id: profile_id,
      status: "solved",
      date: {
        [Op.between]: [
          new Date(year + "-" + month + "-" + (date - 7) + " 00:00:00"),
          new Date(year + "-" + month + "-" + (date - 6) + " 23:59:59"),
        ],
      },
    },
  });
  const stats = [
    { day: 1, value: lastWeekCount },
    { day: 2, value: yesterdayCount },
    { day: 3, value: todayCount },
  ];
  res.status(status_codes.SUCCESS).json(stats);
};

module.exports = getStats;
