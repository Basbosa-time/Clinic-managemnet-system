require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors');
const multer = require('multer');
const path = require("path");

const branch = require('./models/branchSchema');

const service = require('./models/serviceSchema');
const user = require('./models/userSchema');

const doctor = require('./models/doctorSchema');


const recep = require('./models/recepSchema');
//image variables
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        //console.log(path.join(__dirname,"images"));
        cb(null,path.join(__dirname,"images"));
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toLocaleDateString().replace(/\//g,"-")+"-"+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype=="image/jpeg"||
       file.mimetype=="image/jpg"||
       file.mimetype=="image/png")
       cb(null,true)
    else
    cb(null,false)
}


// create server
const app =  express();
mongoose.connect("mongodb://localhost:27017/cms")
        .then(()=>{
            console.log("DB connected ....");

            // listen on port Number
            app.listen(process.env.port,()=>{

                console.log("I am Listenining .......")
            });

        })
        .catch(error=>{
                console.log(" DB Problem")
        })

/// Middlewares

app.use((request,response,next)=>{
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
    response.header("Access-Control-Allow-Headers","Content-Type,Authorization")
    next();
})
app.use(cors());

app.use("/images",express.static(path.join(__dirname,"images")));
app.use(multer({storage,fileFilter}).single("image"));

app.use(morgan('dev'));
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());


async function test(){
    // let b1 = new branch({
    //     name:'branch1',
    //     location:'tanta'
    // }).save().then(()=>console.log('tmam'));
    // let b2 = new branch({
    //     name:'branch1',
    //     location:'tanta'
    // }).save().then(()=>console.log('tmam'));

    // let branches = await branch.find().exec();
    // console.log(branches);
    // let s1 =  new service({
    //     name:'s1',
    //     branches:['62310fe7e776c20e9a634b61']
    // }).save().then().catch((err)=>console.log(err));

    // let services = (await service.find()).forEach((s)=>{
    //     s.populate('branches').then((res)=>console.log(res));
    // })
    // console.log(services);

    // new doctor({
    //     specialization:'623117fe0d4c38eb9ea6b5d0',
    //     schedule:[{branchId:'62310fe7e776c20e9a634b61',startTime:'dasdasd',endTime:'fdsfds' , days:['sat','sun']}]
    // }).save().then((doc)=>{
    //     new user({
    //         name:'ali',
    //         email:'ali@yahoo.com',
    //         password:'123',
    //         role:'doctor',
    //         userId:doc._id
    //     }).save().then((u)=>console.log(u)).catch((err)=>console.log(err))
    // })








}


test();

//error middleware
app.use((error,request,response,next)=>{   //JS  code function.length
    let status=error.status||500;
    response.status(status).json({Error:error+""});
})