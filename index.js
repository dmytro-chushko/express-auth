const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRouter = require("./authRouter");

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST_DB = process.env.HOST_DB || "";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(HOST_DB);
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
