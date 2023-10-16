const mongoose = require("mongoose");
const betevos = require("../models/betevoModel");
const sports = require("../models/sportModel");

const getTotalGames = async () => {
  try {
    const currentDate = new Date();
    // Set the time to the start of the current day
//    currentDate.setHours(-4, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    // Set the time to the end of the current day
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
//    endDate.setHours(43, 59, 59, 999);
    // Define the query
    const query = {
      game_datetime: {
        $gte: currentDate,
        $lt: endDate,
      },
    };
    const list = await betevos.distinct("visitor_team home_team", query);
    console.log(list)

  } catch (error) {
    res.status(400).json({ error: "error.message" });
  }
}

const getBetevoSpread = async (req, res) => {
  try {
    const currentDate = new Date();
    // Set the time to the start of the current day
//    currentDate.setHours(-4, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    // Set the time to the end of the current day
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
//    endDate.setHours(43, 59, 59, 999);
    // Define the query
    const query = {
      game_datetime: {
        $gte: currentDate,
        $lt: endDate,
      },
      home_spread_odd: {
        $ne: ""
      },
      home_spread_stand: {
        $ne: ""
      },
    };

    res.json({currentDate, endDate});
    const betevo = await betevos.find(query).select({_id: 1, visitor_team: 1, home_team: 1, visitor_spread_odd: 1, visitor_spread_stand: 1, home_spread_odd: 1, home_spread_stand: 1});
    const sport = await sports.find(query).select({_id: 1, visitor_team: 1, home_team: 1, visitor_spread_odd: 1, visitor_spread_stand: 1, home_spread_odd: 1, home_spread_stand: 1});
    
    const newArray = [];

    betevo.forEach(item => {
      const key = `${item.visitor_team}_${item.home_team}`;
      newArray.push({
        key: key,
        visitor_team: item.visitor_team,
        home_team: item.home_team,
        betevo_visitor_spread_odd: item.visitor_spread_odd,
        betevo_visitor_spread_stand: item.visitor_spread_stand,
        betevo_home_spread_odd: item.home_spread_odd,
        betevo_home_spread_stand: item.home_spread_stand,
        sport_visitor_spread_odd: "N /",
        sport_visitor_spread_stand: "A",
        sport_home_spread_odd: "N /",
        sport_home_spread_stand: "A",
        startDate: currentDate,
        endDate: endDate
      });
    })

    sport.forEach(item => {
      const key = `${item.visitor_team}_${item.home_team}`;

      const existingItem = newArray.find(entry => entry.key === key);

      // If an existing entry is found, push the spread values into the respective arrays
      if (existingItem) {
        existingItem.sport_visitor_spread_odd = item.visitor_spread_odd;
        existingItem.sport_visitor_spread_stand = item.visitor_spread_stand;
        existingItem.sport_home_spread_odd = item.home_spread_odd;
        existingItem.sport_home_spread_stand = item.home_spread_stand;
      } else {
        // Create a new entry with the key and spread value arrays
        newArray.push({
          key: key,
          visitor_team: item.visitor_team,
          home_team: item.home_team,
          betevo_visitor_spread_odd: "N /",
          betevo_visitor_spread_stand: "A",
          betevo_home_spread_odd: "N /",
          betevo_home_spread_stand: "A",
          sport_visitor_spread_odd: item.visitor_spread_odd,
          sport_visitor_spread_stand: item.visitor_spread_stand,
          sport_home_spread_odd: item.home_spread_odd,
          sport_home_spread_stand: item.home_spread_stand,
          startDate: currentDate,
          endDate: endDate
        });
      }
    });

    res.status(200).json(newArray);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getBetevoMoneyLine = async (req, res) => {
  try {
    const currentDate = new Date();
    // Set the time to the start of the current day
//    currentDate.setHours(-4, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    // Set the time to the end of the current day
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
//    endDate.setHours(43, 59, 59, 999);
    // Define the query
    const query = {
      game_datetime: {
        $gte: currentDate,
        $lt: endDate,
      },
      home_money_line_info: {
        $ne: ""
      },
    };
    const betevo = await betevos.find(query).select({_id: 1, visitor_team: 1, home_team: 1, visitor_money_line_info: 1, home_money_line_info: 1});
    const sport = await sports.find(query).select({_id: 1, visitor_team: 1, home_team: 1, visitor_money_line_info: 1, home_money_line_info: 1});
    
    const newArray = [];

    betevo.forEach(item => {
      const key = `${item.visitor_team}_${item.home_team}`;
      newArray.push({
        key: key,
        visitor_team: item.visitor_team,
        home_team: item.home_team,
        betevo_visitor_money_line_info: item.visitor_money_line_info,
        betevo_home_money_line_info: item.home_money_line_info,
        sport_visitor_money_line_info: "N / A",
        sport_home_money_line_info: "N / A"
      });
    })

    sport.forEach(item => {
      const key = `${item.visitor_team}_${item.home_team}`;

      const existingItem = newArray.find(entry => entry.key === key);

      // If an existing entry is found, push the spread values into the respective arrays
      if (existingItem) {
        existingItem.sport_visitor_money_line_info = item.visitor_money_line_info;
        existingItem.sport_home_money_line_info = item.home_money_line_info;
      } else {
        // Create a new entry with the key and spread value arrays
        newArray.push({
          key: key,
          visitor_team: item.visitor_team,
          home_team: item.home_team,
          betevo_visitor_money_line_info: "N / A",
          betevo_home_money_line_info: "N / A",
          sport_visitor_money_line_info: item.visitor_money_line_info,
          sport_home_money_line_info: item.home_money_line_info
        });
      }
    });

    res.status(200).json(newArray);
  } catch (error) {
    res.status(400).json({ error: "error.message" });
  }
};

const getBetevoTotal = async (req, res) => {
  try {
    const currentDate = new Date();
    // Set the time to the start of the current day
//    currentDate.setHours(-4, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    // Set the time to the end of the current day
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
//    endDate.setHours(43, 59, 59, 999);
    // Define the query
    const query = {
      game_datetime: {
        $gte: currentDate,
        $lt: endDate,
      },
      home_total_odd: {
        $ne: ""
      },
      home_total_stand: {
        $ne: ""
      },
    };
    const betevo = await betevos.find(query).select({_id: 1, visitor_team: 1, home_team: 1, visitor_total_odd: 1, visitor_total_stand: 1, home_total_odd: 1, home_total_stand: 1});
    const sport = await sports.find(query).select({_id: 1, visitor_team: 1, home_team: 1, visitor_total_odd: 1, visitor_total_stand: 1, home_total_odd: 1, home_total_stand: 1});
    
    const newArray = [];

    betevo.forEach(item => {
      const key = `${item.visitor_team}_${item.home_team}`;
      newArray.push({
        key: key,
        visitor_team: item.visitor_team,
        home_team: item.home_team,
        betevo_visitor_total_odd: item.visitor_total_odd,
        betevo_visitor_total_stand: item.visitor_total_stand,
        betevo_home_total_odd: item.home_total_odd,
        betevo_home_total_stand: item.home_total_stand,
        sport_visitor_total_odd: "N /",
        sport_visitor_total_stand: "A",
        sport_home_total_odd: "N /",
        sport_home_total_stand: "A"
      });
    })

    sport.forEach(item => {
      const key = `${item.visitor_team}_${item.home_team}`;

      const existingItem = newArray.find(entry => entry.key === key);

      // If an existing entry is found, push the spread values into the respective arrays
      if (existingItem) {
        existingItem.sport_visitor_total_odd = item.visitor_total_odd;
        existingItem.sport_visitor_total_stand = item.visitor_total_stand;
        existingItem.sport_home_total_odd = item.home_total_odd;
        existingItem.sport_home_total_stand = item.home_total_stand;
      } else {
        // Create a new entry with the key and spread value arrays
        newArray.push({
          key: key,
          visitor_team: item.visitor_team,
          home_team: item.home_team,
          betevo_visitor_total_odd: "N /",
          betevo_visitor_total_stand: "A",
          betevo_home_total_odd: "N /",
          betevo_home_total_stand: "A",
          sport_visitor_total_odd: item.visitor_total_odd,
          sport_visitor_total_stand: item.visitor_total_stand,
          sport_home_total_odd: item.home_total_odd,
          sport_home_total_stand: item.home_total_stand
        });
      }
    });

    res.status(200).json(newArray);
  } catch (error) {
    res.status(400).json({ error: "error.message" });
  }
};

module.exports = {
  getTotalGames,
  getBetevoSpread,
  getBetevoMoneyLine,
  getBetevoTotal
};
