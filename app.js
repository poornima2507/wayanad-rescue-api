const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors= require("cors")
const jwt = require("jsonwebtoken")
const loginModel = require("./models/admin")



const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://poornima25:poornima25182220@cluster0.dg8g8.mongodb.net/rescuedb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/adminSignUp", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    input.password = hashedpassword
    console.log(input)
    let result = new loginModel(input)
    result.save()
    res.json({ "status": "success" })
})




app.listen(8081, () => {
    console.log("server started")
})