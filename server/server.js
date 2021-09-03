const express = require('express');
const db = require("./models");
const dotenv = require('dotenv');
const routers = require('./routers');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const path = require("path");
const app = express();
const cors = require("cors");

var corsOption = {
    origin: "http://localhost:5001"
};

app.use(cors(corsOption));

dotenv.config({
    path : "./config/env/config.env"
});

db.sequelize.sync({  alter : true ,  force : false }).then(() => {
    console.log("Drop and re-sync db.");
  });

PORT = process.env.PORT

app.use(express.json());

app.use("/api",routers);

app.use(customErrorHandler);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT} : ${process.env.NODE_ENV}`);
});

