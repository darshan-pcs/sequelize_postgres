const express = require("express")
const db = require("../db/conn")
const model = require("../models/registers")

const dashboard = async (req, res, next) => {

    try {
        // console.log("welcome to deshboard page",req.body.id);

        // const data = await model.findOne({ _id: req.body.id }, { password: 0 })
        // console.log("data visible", data);

        const data = await db.sequelize.query(`SELECT id, first_name, last_name, "date_Of_Birth", "date_Of_Join", blood_group, gender, email, phone, user_name, password, image, document
        FROM public.users where email = '${req.body.email}'`)
        console.log(data[0][0]);


        // res.setHeader("Content-Type", "application/json")

        res.send({ status: true, statuCode: 200, msg: "come on boy", data: data[0][0]  })

        next();

    } catch (error) {
        res.send({ status: false, statuCode: 401, msg: "boy not found", data: error })
        console.log("dashboard error...",error);
    }
}
module.exports = dashboard