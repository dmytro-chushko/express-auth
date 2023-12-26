const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRouter = require("./authRouter");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Dmytro:dPZoD6D3bo2endE3@cluster0.nwpxzjg.mongodb.net/express-auth"
    );
    app.listen(PORT, () => console.log(`Servr started at port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
