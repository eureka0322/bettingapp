require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const betevoRoutes = require("./routes/betevoRoutes");

const app = express();

const corsOptions = {
  origin: "https://bettingapp-thl.onrender.com" // frontend URI (ReactJS)
//  origin: "http://localhost:3000" // frontend URI (ReactJS)
}

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", betevoRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app
    .listen(PORT, () => {
      console.log("Server is runing at port", PORT);
    });
  })
  .catch((error) => {
    console.log("error occured", error);
  });
