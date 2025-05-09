// express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MyBankRouter = require("./routes/BankRoutes");
const MyAccountRouter = require("./routes/AccountRoutes");
const userRouter = require("./routes/UserRoute");
require("dotenv").config();

const port = process.env.PORT || 5000;

// server
const server = express();

// body parser middleware
server.use(bodyParser.json());

// Router
server.use("/api", MyBankRouter);
server.use("/api", MyAccountRouter);
server.use("/api", userRouter);

// connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((resu) => {
    server.listen(port, () =>
      console.log(`the server up and ready on port: ${port}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
