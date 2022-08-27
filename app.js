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

//  const {NODE_ENV, DB_USER, DB_PASSWORD, DB_HOST,DB_NAME}= process.env;

const connect = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URL,{
        //  await mongoose.connect( NODE_ENV === 'production'? `mongodb://${DB_HOST}/${DB_NAME}`: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority` , {
            useNewUrlParser:true,
              useUnifiedTopology:true,
         });
        console.log( 'connected to db' );
    } catch( error ) {
        console.error( error.message );
        process.exit( 1 );
    }
};
connect();

//configuring body parser(accepts key value from request and parses)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//configuring morgan(logger)
app.use(morgan("dev"));
//
//use it to work on database;
app.use("/users",userRouter);
app.use("/certs",certRouter);



const PORT=process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});

// const PORT = process.env.PORT || 4000;

// app.listen( PORT, () => {
//         console.log( `Server running on port ${PORT}` );
//     }) // listen() returns server
//     .on( 'error', error => { // server.on( ... )
//         console.error( error.message );
//     });
module.exports = app;
