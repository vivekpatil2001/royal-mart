import express  from "express";


import mongoose, { connect } from "mongoose";

import User from "./model/User/User.js";



import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(express.json());

const PORT = 5000;



const connectMongoDB = async ()=>{
    const conn  = await mongoose.connect(process.env.MONGODB_URI)

    if(conn){
        console.log('mongoDB connect succesfully')
    }
}

//post signup

app.post('/signup', async (req, res)=>{

    const {name, email, password, mobile, address, gender} = req.body;
try {
    const user = new User ( {
         name:name,
         email:email,
         password:password,
         mobile:mobile,
         address:address,
         gender:gender

    }) ;

    const saveduser = await user.save();

    res.json({
        success:true,
        data:saveduser,
        message:'user saved'
    })
} catch(err) {
    res.json({
        success:false,
        message: err.message 
    })
}

   
})

//login

app.get('/login', async(req, res)=>{

    const { email,password,name,mobile} = req.body;

    const user = await User.findOne({email,password}).select('email name mobile');

    if(user==null){
        return res.json({
            success:false,
            message:'login failed plz sign up '
        });

        res.json({
            success:true,
            datq:user,
            message:'succesfully login user'
        })
    }
})





app.listen(PORT, ()=>{
    console.log(`port running on ${PORT}`)
    connectMongoDB();
})

