const db = require("../db/conn")
const express = require('express')
const path = require("path")
const bcrypt = require("bcrypt")
const iPath = "public/upload/documents/"
const dPath = "public/upload/image/"
const jwt = require("jsonwebtoken")
var path1 = "";
var path2 = "";

//Post Request that handles Register
const register_user = async (req, res) => {

    try {

        // image and document storing
        console.log(req.body);
        const image = req.files.image
        console.log(image);
        const document = req.files.document
        console.log(document);

        const ext1 = path.extname(image.name)
        console.log(ext1);
        const ext2 = path.extname(document.name)
        console.log(ext2);

        path1 = path.join("img_" + Date.now() + ext1)
        console.log(path1, "path1111");
        path2 = path.join("doc_" + Date.now() + ext2)
        console.log(path2, "path2222");

        // var userr;
        if (ext1 == ".jpeg" || ext1 == ".jpg" || ext1 == ".png") {
            console.log("2");

            if (ext2 == ".pdf") {
                console.log("3");

                image.mv(iPath + path1)
                document.mv(dPath + path2)

                // password storing
                req.body.password = await bcrypt.hash(req.body.password, 12);
                console.log(req.body.password);

                const createUser = await db.sequelize.query(
                    `INSERT INTO public.users(
                    first_name, last_name, "date_Of_Birth", "date_Of_Join", blood_group, gender, email, phone, user_name, password, image, document)
                    VALUES ('${req.body.first_name}','${req.body.last_name}','${req.body.date_Of_Birth}','${req.body.date_Of_Join}',
                    '${req.body.blood_group}','${req.body.gender}','${req.body.email}',
                    '${req.body.phone}','${req.body.user_name}','${req.body.password}','${path1}','${path2}')`
                );

                console.log("Create user as a sequelize...", createUser);
                console.log("qwer123");


                const token = await jwt.sign(
                    { user_name: req.body.user_name.toString() },
                    process.env.SECRET_KEY
                ); console.log("BCRYPT_TOKEN", token);


                res.send({
                    status: true,
                    statuCode: 201,
                    msg: "token generated.../... you have successfully register",
                    user_data: { token: token }
                })
            }
            else {
                res.send({
                    status: false,
                    statusCode: 400,
                    message: "please select a valid file with .pdf extention",
                    data: [],
                });
                console.log(error, "upload valid file...");
            }
        } else {
            res.send({
                status: false,
                statusCode: 400,
                message: "enter a valid image with a jpeg ,png or jpg formate ",
                data: [],
            });
            console.log(error, "upload valid photo...");
        }
    } catch (error) {
        res.send(error);
        console.log("Error on controllor...",error);
    }
}
module.exports = register_user


// ---------------------------------------------------------------------------
// const register = (req,res)=>{
//     console.log(req.body);
//     try {
//         const addRegocrd = new schem(req.body)
//         console.log(req.body);
//         const createUser = addRegocrd.save()
//         res.status(201).send(createUser)
//     } catch (error) {
//         res.status(400).send(error)
//         console.log("throw errorrrrrrrr", error);
//     }
// }
