const { json } = require("express/lib/response");
const Category = require("../../model/category");
const status_codes = require("../../utils/status_code/status_code");

const getCategories = async (req, res) => {
  Category.findAll()
    .then((categories) => {
      result = [];
      for (let i = 0; i < categories.length; i++) {
        result.push({
          category_id: categories[i].dataValues.category_id,
          category_name: categories[i].dataValues.category_name,
        });
      }
      res.status(status_codes.SUCCESS).json(result);
    })
    .catch((err) => {
      res.status(status_codes.INTERNAL_SERVER_ERROR).json(err);
    });
};

module.exports = getCategories;
