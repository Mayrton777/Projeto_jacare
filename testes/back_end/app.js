const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require("./src/router/userRoutes");

app.use(cors())
app.use(express.json());



app.use("/user", userRoutes);

module.exports = app;