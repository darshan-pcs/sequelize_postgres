const express = require("express")
const { application } = require("express")
const router = new express.Router() // 1. create router

const register = require("../controller/registration")
const login = require("../controller/loginController")
const dashboard = require("../controller/dashboard")

const auth = require("../middleware/auth")

router.post("/register",register)
router.post("/login",login)
router.get("/dashboard",auth,dashboard)

module.exports = router // 2export router to the index.js  