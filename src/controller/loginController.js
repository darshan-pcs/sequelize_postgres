const express = require("express")
const model = require("../models/registers")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { read } = require("fs")
const { error } = require("console")
const db = require("../db/conn")

const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        // const email = req.body.email
        const password = req.body.password

        // const userData = await model.findOne({ email: email })
        // console.log("userData",userData);

        const userData = await db.sequelize.query(`SELECT * FROM public.users where email = '${req.body.email}'`) 
        // console.log(email)
        
        const login_password = userData[0][0].password
        console.log(login_password);

        if (userData != null) {
            console.log("inside password match");
            const passwordMatch = await bcrypt.compare(password,login_password)
            console.log("passwordMatch",passwordMatch);
            
            const token = jwt.sign({
                email:userData[0][0].email
            },process.env.SECRET_KEY)
            console.log("BCRYPT_TOKEN", token);
            console.log(userData,"without array");
            console.log(userData[0][0],"with array");
            
            if(passwordMatch){
                // const userResult = {email: userData.email,password: userData.password,username: userData.username}
                // const response ={success:true, msg: "user Details", data: userResult}
                res.send({status:true, statuCode:200, msg:"you have successfully login", userData:{token:token}})
            }else{
                res.send({status: false,statuCode:401, msg: "Login details are incorrect",userData:[]})
                console.log("password doesn't match",error);
            }

        } else {
            res.send({status:false, statuCode:401, msg: "invalid user",userData:[]})
            console.log("another password problem",error);
        }

    } catch (error) {
        res.send({status:false, statuCode:400, msg:"invalid login and password",userData:[]})
        console.log("login page error", error);
    }
}



// const loginUser = async (req, res) => {
//     try {
//         console.log(req.body);
//         const username = req.body.username
//         console.log(username);
//         const password = req.body.password
//         console.log(password);

//         const data = await model.findOne({
//             $or:[{email:req.body.username},{username:req.body.username},{phone:req.body.username}]
//         })
//         console.log("your data",data);

//         if(data != null){
//             console.log("nullaable");
//             const bcryptPassword = await bcrypt.compare(password,data.password)
//             console.log("bcryptPassword",bcryptPassword);
//             const token = jwt.sign({
//                 _id: data._id
//             },process.env.SECREET_KEY)
//             console.log("BCRYPT_TOKEN",token);

//             if(bcryptPassword){
//                 res.send({status:true,statuCode:200,msg:"you have successfully login",data:{token:token}})
//             }else{
//                 res.send({status:false,statuCode:401,msg:"invalid login password",data:[]})
//                 console.log("password problem",error);
//             }
//         }else{
//             res.send({status:false,statuCode:401,msg:"invalid User",data:[]})
//             console.log("another password problem",error);
//         }        
//     } catch (error) {
//         res.send({status:false,statuCode:400,msg:"invalid login and password",data:[]})
//         console.log("login page error", error);
//     }
// }

module.exports = loginUser