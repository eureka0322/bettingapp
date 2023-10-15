const express = require("express");
const {
  getTotalGames,
  getBetevoSpread,
  getBetevoMoneyLine,
  getBetevoTotal
} = require("../controllers/betevoController");


const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello. Done!" });
});

router.get("/games", getTotalGames);
router.get("/spread", getBetevoSpread);
router.get("/moneyline", getBetevoMoneyLine);
router.get("/total", getBetevoTotal);

module.exports = router;
