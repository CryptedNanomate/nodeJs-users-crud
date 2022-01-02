

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();




//this is not real port
dotenv.config({path:'config.env'})  

const PORT = process.env.PORT || 8080
//to log all incomming requests
app.use(morgan("tiny"));

// connections..

connectDB();

//parse requests with body parser
app.use(bodyparser.urlencoded({extended: true}));

 //seting engine

 app.set("view engine","ejs")

 //app.set("views".path.resolve(__dirname, "views/ejs"))

//loading assets

app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/css',express.static(path.resolve(__dirname,"assets/img")));
app.use('/css',express.static(path.resolve(__dirname,"assets/js")));
//load routers

app.use('/',require('./server/routes/router'));




app.listen(3000,() => {
  console.log(`server is running on http://localhost/${PORT}`);  
})