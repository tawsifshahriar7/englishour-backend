const { json } = require("express/lib/response");
const Category = require("../model/category");
const status_codes = require("../utils/status_code/status_code");

const CategoryDetails = async (req, res) => {
  let categoryDetails = [];
  let categories = await Category.findAll({
    // where: { username: username },
  });
  for(let category of categories){
    categoryDetails.push(category.dataValues);
  }
  console.log(categoryDetails)
  return res.status(status_codes.SUCCESS).send(categoryDetails);
};

module.exports = CategoryDetails;
