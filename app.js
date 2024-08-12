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

app.post("/adminSignIn", (req, res) => {
    let input = req.body
    let result = loginModel.find({ username: input.username }).then((response) => {
        if (response.length > 0) {
            const validator = bcrypt.compareSync(input.password, response[0].password)
            if (validator) {
                jwt.sign({ email: input.username }, "rescue-app", { expiresIn: "1d" }, (error, token) => {
                    if (error) {
                        res.json({ "status": "token created failed" })

                    } else {
                        res.json({ "status": "success", "token": token })


                    }
                })

            } else {
                res.json({ "status": "Wrong passsword is entered" })

            }

        } else {
            res.json({ "status": "username does not exist" })
        }
    })

})



app.listen(8081, () => {
    console.log("server started")
})