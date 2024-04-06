require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const corOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")

const PORT = process.env.PORT || 1000
const app = express()
connectDB()

app.use(express.json())
app.use(express.static("public"))
app.use(cors(corOptions))
app.use('/api/users',require("./Router/UserRouter"))
app.use('/api/posts',require("./Router/PostRouter"))
app.use('/api/todos',require("./Router/TodoRouter"))
app.use('/api/photos',require("./Router/PhotoRouter"))

mongoose.connection.once('open', () => {
    console.log("connect to DB")

    app.listen(PORT, () => {
        console.log(`server running on PORT ${PORT}`)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
})

