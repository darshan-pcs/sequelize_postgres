const { DataTypes } = require("sequelize");
var db = require("../db/conn")

sequelize = db.sequelize, 
Sequelize = db.Sequelize;

const userschema = sequelize.define('user',{
    first_name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    last_name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    date_Of_Birth:{
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    date_Of_Join:{
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    blood_group:{
        type : DataTypes.STRING,
    },
    gender:{
        type : DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING, 
        allowNull : false
    },
    phone:{
        type : DataTypes.STRING,
        allowNull : false
    },
    user_name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false
    },
    image:{
        type : DataTypes.STRING
    },
    document: {
        type : DataTypes.STRING
    },
    
},{
    timestamps : false
})


// console.log(User === sequelize.models.User)
sequelize.sync({ alter: true });
module.exports = userschema;
