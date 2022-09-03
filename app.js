require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/user.js");
const certRouter = require("./routes/cert.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const cors =require("cors");
const path=require('path')
app.use(express.json());


if(process.env.NODE_ENV==="production"){
    app.use(cors());
    
}
app.use(express.static(path.join( process.cwd(), 'public')));

//  app.get('*',(req,res)=>{
//        res.sendFile(path.join(process.cwd(),'public/index.html'))
//    })

 const {NODE_ENV, DB_USER, DB_PASSWORD, DB_HOST,DB_NAME}= process.env;

const connect = async () => {
    try {
        const url=NODE_ENV !== 'production'? `mongodb://${DB_HOST}/${DB_NAME}`: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
        console.log(url);
         await mongoose.connect( url ) 
        console.log( 'connected to db' );
    } catch( error ) {
        console.error( error.message );
        process.exit( 1 );
    }
};
connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
//
app.use("/users",userRouter);
app.use("/certs",certRouter);


  const PORT = process.env.PORT || 4000;

  app.listen( PORT, () => {
          console.log( `Server running on port ${PORT}` );
      }) 
      .on( 'error', error => { 
          console.error( error.message );
      });
module.exports = app;
