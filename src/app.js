require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");
const homelandRouter = require("./routers/homeland");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(adminRouter);
app.use(homelandRouter);

module.exports = app;

console.log(process.env.PORT);
