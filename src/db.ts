require('dotenv').config();
const mongoose = require('mongoose');

// const MONGO_DB = process.env.MONGO_DB || "mongodb://localhost/prueba"
const MONGO_DB = process.env.MONGO_DB;

mongoose.connect(MONGO_DB, () => {

    console.log('conected to DB Mongo');

}, (err: any) => console.error(err));



module.exports = {
    conn: mongoose,
};

// https://cloud.mongodb.com/v2/631682c7d0ee284acd70f944#clusters