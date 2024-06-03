const mongoose = require('mongoose')
const express = require("express");
const fs = require("fs");

// const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/user");

const app = express();

// const PORT = 3000;

//middleware plugin
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRouter);


const PORT = 5000;
mongoose
  .connect('mongodb://0.0.0.0:27017/mvc')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });