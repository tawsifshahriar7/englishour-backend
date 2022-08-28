const { json } = require("express/lib/response");
const Moderator = require("../../model/moderator");
const Exercise = require("../../model/exercise");
const User = require("../../model/user");
const Profile = require("../../model/profile");
const History = require("../../model/history");

const status_codes = require("../../utils/status_code/status_code");


const AllMonths = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
}

const AllGraphs = async (req, res) => {
  console.log("ami all graphs e ashchi");

  // let graphType = parseInt(req.query.graphType);
  

  console.log("before parsing");

  let modEx = req.query.modEx_graph;
  let modRating = req.query.modRating_graph;
  let stdActivity = req.query.stdActivity_graph;
  let stdJoined = req.query.stdJoined_graph;
  let stdSuccess = req.query.stdSuccess_graph;

  console.log("after parsing");

  console.log("modEx",modEx);
  console.log("modRating",modRating);

  let allData = {};


  if(modEx === "true")
  {
    console.log("modex is true");

    let modEx_data = [];

    let allEx = await Exercise.findAll({
      where: {  },
    });
    console.log("printing allEx",allEx);
  
    let modUnique = [];
  
    for(let ex of allEx){
      let ex_id = ex.dataValues.exercise_id;
      let mod_id = ex.dataValues.moderator_id;
  
      if(modUnique.includes(mod_id)){
        continue;
      }
  
      let mod = await Moderator.findOne({
          where: { moderator_id: mod_id },
        });
  
      if(mod.dataValues.isAdmin === "true"){ 
        continue;
      }
  
      let added_ex_count = 0;
      for(let tempEx of allEx){
          if(tempEx.dataValues.moderator_id == mod_id){
              added_ex_count++;
          }
      }
  
      let send_data_one = {
          "moderator_id": mod_id,
          "moderator_name": mod.dataValues.first_name + " " + mod.dataValues.last_name,
          "added_ex_count": added_ex_count,
          "exercise_id": ex_id,
          "exercise_type": ex.dataValues.exercise_type,
      }
      modEx_data.push(send_data_one);
  
      modUnique.push(mod_id);
    }
  
    allData["modEx_graph"] = modEx_data;

  }

  if(modRating === "true")
  {
    console.log("modRating is true");

    let modRating_data = [];

    let allMods = await Moderator.findAll({
      where: { isAdmin: "false" },
    });

    let send_data_one = {};
    for(let mod of allMods)
    {
      send_data_one = {
        moderator_id: mod.dataValues.moderator_id,
        moderator_name: mod.dataValues.first_name + " " + mod.dataValues.last_name,
        rating: mod.dataValues.rating,
      }

      modRating_data.push(send_data_one);
    }

    allData["modRating_graph"] = modRating_data;


  }


  if(stdJoined === "true")
  {
    let month1 = req.query.month1;
    let month2 = req.query.month2;

    console.log("month1: ",month1);
    console.log("month2: ",month2);

    let stdJoined_data = [];

    let allStd = await User.findAll({
      where: {  },
    });


    let allCount = {};

    for(let i = month1; i <= month2; i++)
    {
      allCount[i] = 0;
    }

    for(let std of allStd)
    {
      let month = std.dataValues.joinDate.getMonth();
      console.log("date: ", std.dataValues.joinDate);
      console.log("month: ", month);

      if(month >= month1 && month <= month2)
      {
        if(allCount[month+1] === undefined)
        {
          allCount[month+1] = 1;
        }
        else{
          allCount[month+1]++;
        }
      }

    }

    console.log("allCount: ",allCount);
    Object.keys(allCount).map(key => stdJoined_data.push({"month": AllMonths[key], "count": allCount[key]}));

    // for(let count of allCount)
    // {
    //   stdJoined_data.push({count: allCount[count]});
    // }

    console.log("this is stdJoined_data: ",stdJoined_data);

    allData["stdJoined_graph"] = stdJoined_data;
    
  }




  if(stdActivity === "true")
  {
    console.log("stdActivity is true");
    const current = new Date();
    const currentMonth = current.getMonth() + 1;

    let stdActivity_data = [];

    let allProfiles = await Profile.findAll({
      where: {  },
    });

    let superActive = 0, midActive = 0, barelyActive = 0, inactive=0;

    for(let profile of allProfiles)
    {
      let profile_id = profile.dataValues.profile_id;

      let allHistory = await History.findAll({
        where: { profile_id: profile_id },
      });

      let tempCount = 0;
      for(let history of allHistory)
      {
        let month = history.dataValues.updatedAt.getMonth() + 1;
        if(month == currentMonth)
        {
          tempCount++;
        }
      }
    
      if(tempCount == 0)
      {
        inactive++;
      }
      if(tempCount > 0 && tempCount <= 3)
      {
        barelyActive++;
      }
      else if(tempCount >3 && tempCount < 10)
      {
        midActive++;
      }
      else if(tempCount >= 10)
      {
        superActive++;
      }

    }

    stdActivity_data.push({active: "Inactive", count: inactive});
    stdActivity_data.push({active: "Barely Active", count: barelyActive});
    stdActivity_data.push({active: "Active", count: midActive});
    stdActivity_data.push({active: "Highly Active", count: superActive});


    // stdActivity_data.push({active: "Inactive (attempt = 0)", count: inactive});
    // stdActivity_data.push({active: "Barely Active (attempt < 3)", count: barelyActive});
    // stdActivity_data.push({active: "Active (3< attempt < 10)", count: midActive});
    // stdActivity_data.push({active: "Highly Active (attempt > 10)", count: superActive});


    allData["stdActivity_graph"] = stdActivity_data;

    
  }

  
  if(stdSuccess === "true")
  {

    let stdSuccess_data = [];

    let allHistory = await History.findAll({
      where: {  },
    });

    let levelSuccess = {};
    let levelFailed = {};
    let allProfiles={};

    for(let history of allHistory)
    {
      let profile_id = history.dataValues.profile_id;
      let status = history.dataValues.status;

      if(allProfiles[profile_id] === undefined)
      {
        let profile = await Profile.findOne({
          where: { profile_id: profile_id },
        });

        allProfiles[profile_id] = profile.dataValues.current_level;
      }
      
      let level = allProfiles[profile_id];
      
      if(levelSuccess[level] === undefined)
      {
        levelSuccess[level] = 0;
      }
      if(levelFailed[level] === undefined)
      {
        levelFailed[level] = 0;
      }

      if(status === "solved")
      {
          levelSuccess[level]++;
      }
      else if(status === "unsolved")
      {
        levelFailed[level]++;
      } 

    }

    Object.keys(levelSuccess).map(level => stdSuccess_data.push({"level": "Level "+level, "count": levelSuccess[level]*100.0/(levelSuccess[level]+levelFailed[level])}));



    allData["stdSuccess_graph"] = stdSuccess_data;

    
  }




//   let moderator_id = parseInt(req.query.moderator_id);
// let send_data = [{
//     "moderator_id": 0,
//     "moderator_name": "",
//     "added_ex_count": 0,
//     "exercise_id": 0,
//     "exercise_type": "",
//   }];

  
  return res.status(status_codes.SUCCESS).send(allData);
};

module.exports = AllGraphs;
