require('dotenv').config();
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const db = require("./src/db/conn")

const router = require("./src/routers/routes");

// const sequelize = require("sequelize")
// const { Sequelize } = require('./src/db/conn');

(sequelize = db.sequelize),(Sequelize = db.Sequelize)

const port = process.env.PORT || 8000

// const user = require("./src/models/registers")

app.use(express.json())
app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)// 3. register our router



app.listen(port, () => {
    console.log(`listening to port ${port}`);
})

