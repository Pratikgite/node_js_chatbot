require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const endPoint = require('./routes/endPoint');
const { dbcon } = require('./config/connection');

dbcon();

app.use(express.json());
endPoint(app);

app.listen("3000", () => {
    console.log("Listening on port 3000");
});