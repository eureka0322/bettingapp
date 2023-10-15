const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const betevoSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    visitor_team: {
      type: String,
      required: true
    },
    visitor_spread_odd: {
      type: String,
    },
    visitor_spread_stand: {
      type: String,
    },
    visitor_money_line_info: {
      type: String,
    },
    visitor_total_odd: {
      type: String,
    },
    visitor_total_stand: {
      type: String,
    },
    home_team: {
      type: String,
      required: true
    },
    home_spread_odd: {
      type: String,
    },
    home_spread_stand: {
      type: String,
    },
    home_money_line_info: {
      type: String,
    },
    home_total_odd: {
      type: String,
    },
    home_total_stand: {
      type: String,
    },
    game_datetime: {
      type: Date,
    },
  },
);

module.exports = mongoose.model("mc_betevo88s", betevoSchema);
